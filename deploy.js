#!/usr/bin/env node
/**
 * deploy.js - Script de déploiement pour statut-juridique-entreprise.fr
 * 
 * Usage:
 *   node deploy.js           → GitHub + OVH
 *   node deploy.js --github  → GitHub uniquement
 *   node deploy.js --ovh     → OVH uniquement
 *   node deploy.js --check   → Vérifie la connexion OVH et liste les fichiers distants
 */

require('dotenv').config();
const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Configuration ─────────────────────────────────────────────────────────
const PLESK = {
    host: process.env.PLESK_HOST || '151.80.33.173',
    username: process.env.PLESK_USER || 'root',
    password: process.env.PLESK_PASS,
    port: 22,
    tryKeyboard: true,
};

// Chemin distant sur le serveur Plesk
const REMOTE_PATH = process.env.PLESK_SITE_PATH || '/var/www/vhosts/statut-juridique-entreprise.fr/httpdocs';

// Fichiers à déployer (tous les fichiers du projet sauf les outils)
const EXCLUDED = [
    'node_modules', '.git', '.env', 'package.json', 'package-lock.json',
    'deploy.js', '.gitignore', 'README.md',
    'blog'  // ⚠️ NE JAMAIS TOUCHER : contient le site WordPress (articles du blog)
];

// Dossiers protégés sur le serveur distant — jamais uploadés ni modifiés
const PROTECTED_REMOTE_DIRS = ['blog'];

// ─── Utilitaires ───────────────────────────────────────────────────────────
function log(msg) { console.log(`  ${msg}`); }
function ok(msg) { console.log(`✅ ${msg}`); }
function err(msg) { console.error(`❌ ${msg}`); }
function info(msg) { console.log(`📋 ${msg}`); }

function getFilesToDeploy(dir) {
    const files = [];
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        if (EXCLUDED.includes(entry)) continue;
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
            files.push(fullPath);
        } else if (stat.isDirectory()) {
            files.push(...getFilesToDeploy(fullPath));
        }
    }
    return files;
}


// ─── Cache Buster ──────────────────────────────────────────────────────────
function injectCacheBuster() {
    console.log('\n🧹 CACHE BUSTER');
    console.log('─'.repeat(40));
    try {
        const timestamp = Date.now();
        const filesToCheck = getFilesToDeploy(__dirname);
        let updatedCount = 0;
        
        for (const fullPath of filesToCheck) {
            if (fullPath.endsWith('.html')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                // Regex to find src="/components.js" or "components.js" preserving the path option
                const newContent = content.replace(/src="(\/)?components\.js(\?v=[^"]+)?"/g, `src="$1components.js?v=${timestamp}"`);
                
                // Similar for styles.css if needed, but keeping it focused on components.js
                const newContentCSS = newContent.replace(/href="(\/)styles\.css(\?v=[^"]+)?"/g, `href="$1styles.css?v=${timestamp}"`);

                if (content !== newContentCSS) {
                    fs.writeFileSync(fullPath, newContentCSS, 'utf8');
                    updatedCount++;
                }
            }
        }
        console.log(`✅ ${updatedCount} fichier(s) HTML mis à jour (Cache Buster : ?v=${timestamp})`);
    } catch (e) {
        console.error(`❌ Erreur Cache Buster: ${e.message}`);
    }
}

// ─── GitHub ────────────────────────────────────────────────────────────────
async function pushToGithub() {
    console.log('\n🔵 PUSH GITHUB');
    console.log('─'.repeat(40));
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf-8' });
        if (!status.trim()) {
            ok('Aucune modification à committer (repo à jour)');
            return true;
        }
        log('Modifications détectées :');
        console.log(status);

        const timestamp = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        execSync('git add .');
        execSync(`git commit -m "Deploy ${timestamp}"`);
        execSync('git push origin master');
        ok('Push GitHub réussi !');
        return true;
    } catch (e) {
        err(`Erreur GitHub : ${e.message}`);
        return false;
    }
}

// ─── OVH SFTP ────────────────────────────────────────────────────────────
function connectSSH(server) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => resolve(conn))
            .on('keyboard-interactive', (n, i, il, p, finish) => finish([server.password]))
            .on('error', reject)
            .connect(server);
    });
}

function getSftp(conn) {
    return new Promise((resolve, reject) => {
        conn.sftp((err, sftp) => err ? reject(err) : resolve(sftp));
    });
}

function mkdirRemote(sftp, remotePath) {
    return new Promise((resolve) => {
        sftp.mkdir(remotePath, (err) => resolve(!err));
    });
}

function uploadFile(sftp, localFile, remoteFile) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(localFile);
        const writeStream = sftp.createWriteStream(remoteFile);
        writeStream.on('close', resolve);
        writeStream.on('error', reject);
        readStream.pipe(writeStream);
    });
}

async function pushToPlesk() {
    console.log('\n🟠 DEPLOY PLESK/OVH (SFTP)');
    console.log('─'.repeat(40));
    log(`Serveur  : ${PLESK.host}`);
    log(`Chemin   : ${REMOTE_PATH}`);

    const localDir = __dirname;
    const files = getFilesToDeploy(localDir);
    log(`Fichiers à uploader : ${files.length}`);

    let conn, sftp; // eslint-disable-line prefer-const
    try {
        log('Connexion SSH...');
        conn = await connectSSH(PLESK);
        sftp = await getSftp(conn);
        ok('Connexion établie');

        // S'assurer que le dossier de destination existe
        await mkdirRemote(sftp, REMOTE_PATH);

        // Upload de chaque fichier
        for (const localFile of files) {
            const relativePath = path.relative(localDir, localFile).replace(/\\/g, '/');
            const remoteFile = `${REMOTE_PATH}/${relativePath}`;

            // 🛡️ Garde-fou : ne JAMAIS toucher aux dossiers protégés (ex: /blog = WordPress)
            const isProtected = PROTECTED_REMOTE_DIRS.some(dir =>
                relativePath.startsWith(dir + '/') || relativePath === dir
            );
            if (isProtected) {
                console.log(`  ⛔ ${relativePath} — IGNORÉ (dossier protégé)`);
                continue;
            }

            // Créer les sous-dossiers si nécessaire
            const remoteDir = path.dirname(remoteFile).replace(/\\/g, '/');
            if (remoteDir !== REMOTE_PATH) {
                await mkdirRemote(sftp, remoteDir);
            }

            process.stdout.write(`  📤 ${relativePath}... `);
            await uploadFile(sftp, localFile, remoteFile);
            process.stdout.write('✓\n');
        }

        conn.end();
        ok(`${files.length} fichier(s) déployé(s) avec succès !`);
        ok(`🌐 https://statut-juridique-entreprise.fr`);
        return true;

    } catch (e) {
        err(`Erreur Plesk : ${e.message}`);
        if (conn) conn.end();
        return false;
    }
}

// ─── Check connexion OVH ────────────────────────────────────────────────
async function checkPlesk() {
    console.log('\n🔍 VÉRIFICATION CONNEXION PLESK');
    console.log('─'.repeat(40));
    log(`Serveur : ${PLESK.host}`);
    let conn;
    try {
        conn = await connectSSH(PLESK);
        ok('Connexion SSH OK');

        const sftp = await getSftp(conn);
        ok('SFTP OK');

        // Lister les vhosts disponibles
        const vhostPath = '/var/www/vhosts';
        const list = await new Promise((resolve, reject) => {
            sftp.readdir(vhostPath, (err, list) => err ? reject(err) : resolve(list));
        });

        info('Vhosts disponibles sur le serveur Plesk :');
        list.filter(f => f.attrs.isDirectory()).forEach(f => log(`  📁 ${f.filename}`));

        // Essayer de lister le dossier du site
        const siteDir = REMOTE_PATH;
        try {
            const siteList = await new Promise((resolve, reject) => {
                sftp.readdir(siteDir, (err, list) => err ? reject(err) : resolve(list));
            });
            info(`\nContenu de ${siteDir}/ :`);
            siteList.slice(0, 20).forEach(f => log(`  ${f.attrs.isDirectory() ? '📁' : '📄'} ${f.filename}`));
        } catch (e) {
            log(`  ⚠️  Dossier ${siteDir} non trouvé (à créer)`);
        }

        conn.end();
    } catch (e) {
        err(`Connexion échouée : ${e.message}`);
        if (conn) conn.end();
    }
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
    const args = process.argv.slice(2);
    const onlyGithub = args.includes('--github');
    const onlyOVH = args.includes('--ovh');
    const check = args.includes('--check');

    console.log('🚀 DÉPLOIEMENT - statut-juridique-entreprise.fr');
    console.log('═'.repeat(40));

    if (check) {
        await checkPlesk();
        return;
    }

    injectCacheBuster();

    let githubOk = true;
    let pleskOk = true;

    if (!onlyOVH) {
        githubOk = await pushToGithub();
    }

    if (!onlyGithub) {
        pleskOk = await pushToPlesk();
    }

    console.log('\n═'.repeat(40));
    console.log('📊 RÉSUMÉ :');
    if (!onlyOVH) log(`GitHub : ${githubOk ? '✅ OK' : '❌ ERREUR'}`);
    if (!onlyGithub) log(`Plesk  : ${pleskOk ? '✅ OK' : '❌ ERREUR'}`);
}

main();
