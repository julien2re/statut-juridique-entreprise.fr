/**
 * components.js - Header & Footer unifiés pour statut-juridique-entreprise.fr
 * 
 * Ce fichier injecte le même header et footer sur toutes les pages du site,
 * garantissant une navigation cohérente et uniforme.
 */

(function () {
    'use strict';

    // ─── Configuration ─────────────────────────────────────────────────────────
    const PAGES = [
        { href: '/index.html', label: 'Guide Statut Juridique' },
        { href: '/statut-juridique-entreprise-definition.html', label: 'Définition' },
        { href: '/statut-juridique-entreprise-exemple.html', label: 'Exemples' },
        { href: '/tableau-comparatif-des-differents-statuts-juridiques.html', label: 'Comparatif' },
        { href: '/statut-juridique-entreprise-pdf.html', label: 'Guide PDF' }
    ];

    const CTA = { href: '/index.html#simulateur', label: 'Lancer le simulateur' };

    // Détecte la page courante
    function getCurrentPage() {
        const path = window.location.pathname;
        for (const page of PAGES) {
            if (path === page.href || path.endsWith(page.href.replace('/', ''))) {
                return page.href;
            }
        }
        // Fallback: si on est sur /index.html ou /
        if (path === '/' || path === '' || path.endsWith('index.html')) {
            return '/index.html';
        }
        return null;
    }

    // ─── HEADER ────────────────────────────────────────────────────────────────
    function createHeader() {
        const currentPage = getCurrentPage();

        // Navigation links (desktop)
        const navLinks = PAGES.map(page => {
            const isActive = page.href === currentPage;
            const activeClass = isActive
                ? 'site-nav__link site-nav__link--active'
                : 'site-nav__link';
            const ariaCurrent = isActive ? ' aria-current="page"' : '';
            return `<a href="${page.href}" class="${activeClass}"${ariaCurrent}>${page.label}</a>`;
        }).join('\n                ');

        // Navigation links (mobile)
        const mobileLinks = PAGES.map(page => {
            const isActive = page.href === currentPage;
            const activeClass = isActive
                ? 'site-nav-mobile__link site-nav-mobile__link--active'
                : 'site-nav-mobile__link';
            const ariaCurrent = isActive ? ' aria-current="page"' : '';
            return `<a href="${page.href}" class="${activeClass}"${ariaCurrent}>${page.label}</a>`;
        }).join('\n                    ');

        return `
<header class="site-header" id="siteHeader" role="banner">
    <div class="site-header__container">
        <div class="site-header__inner">
            <!-- Logo -->
            <a href="/index.html" class="site-header__logo" aria-label="Accueil - Statut Juridique Entreprise">
                <div class="site-header__logo-icon" aria-hidden="true">SJ</div>
                <div class="site-header__logo-text">Statut <span>Juridique</span> Entreprise</div>
            </a>

            <!-- Desktop Navigation -->
            <nav class="site-nav" id="mainNav" role="navigation" aria-label="Navigation principale">
                ${navLinks}
            </nav>

            <!-- Desktop CTA -->
            <div class="site-header__cta">
                <a href="${CTA.href}" class="site-header__cta-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    ${CTA.label}
                </a>
            </div>

            <!-- Mobile Hamburger -->
            <button class="site-header__hamburger" id="navToggle" type="button" aria-expanded="false" aria-controls="navMobilePanel" aria-label="Ouvrir le menu de navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>

    <!-- Mobile Overlay -->
    <div class="site-nav-mobile__overlay" id="navMobileOverlay" aria-hidden="true"></div>

    <!-- Mobile Panel -->
    <div class="site-nav-mobile" id="navMobilePanel" role="dialog" aria-modal="true" aria-label="Menu de navigation">
        <div class="site-nav-mobile__header">
            <a href="/index.html" class="site-header__logo" aria-label="Accueil">
                <div class="site-header__logo-icon" aria-hidden="true">SJ</div>
                <div class="site-header__logo-text">Statut <span>Juridique</span> Entreprise</div>
            </a>
            <button class="site-nav-mobile__close" id="navMobileClose" type="button" aria-label="Fermer le menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
        <div class="site-nav-mobile__links">
            ${mobileLinks}
        </div>
        <div class="site-nav-mobile__cta">
            <a href="${CTA.href}" class="site-header__cta-btn site-header__cta-btn--full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                ${CTA.label}
            </a>
        </div>
    </div>
</header>`;
    }

    // ─── FOOTER ────────────────────────────────────────────────────────────────
    function createFooter() {
        const navLinks = PAGES.map(page =>
            `<li><a href="${page.href}" class="site-footer__link">${page.label}</a></li>`
        ).join('\n                        ');

        return `
<footer class="site-footer" id="footerMain">
    <div class="site-footer__bg-shapes" aria-hidden="true">
        <div class="site-footer__shape site-footer__shape--1"></div>
        <div class="site-footer__shape site-footer__shape--2"></div>
    </div>
    <div class="site-footer__container">
        <div class="site-footer__grid">
            <!-- Brand -->
            <div class="site-footer__brand">
                <a href="/index.html" class="site-footer__brand-logo" aria-label="Accueil - Statut Juridique Entreprise">
                    <div class="site-header__logo-icon" aria-hidden="true">SJ</div>
                    <div class="site-footer__brand-name">Statut Juridique Entreprise</div>
                </a>
                <p class="site-footer__brand-text">
                    Votre assistant intelligent pour choisir le statut juridique idéal. Simulateur gratuit, comparatifs détaillés et conseils d'experts pour tous les entrepreneurs français.
                </p>
            </div>

            <!-- Navigation -->
            <div class="site-footer__col">
                <h3 class="site-footer__col-title">Navigation</h3>
                <nav aria-label="Navigation pied de page">
                    <ul class="site-footer__list">
                        ${navLinks}
                    </ul>
                </nav>
            </div>

            <!-- Informations -->
            <div class="site-footer__col">
                <h3 class="site-footer__col-title">Informations</h3>
                <ul class="site-footer__list">
                    <li><a href="#" class="site-footer__link">Mentions légales</a></li>
                    <li><a href="#" class="site-footer__link">Politique de confidentialité</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div class="site-footer__col">
                <h3 class="site-footer__col-title">Contact</h3>
                <p class="site-footer__brand-text">
                    Des questions sur votre choix de statut ? Consultez notre FAQ ou utilisez notre simulateur interactif gratuit.
                </p>
            </div>
        </div>

        <div class="site-footer__bottom">
            <p class="site-footer__copyright">© 2025 Statut Juridique Entreprise - Tous droits réservés</p>
            <button type="button" class="site-footer__back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Retour en haut de page">
                Retour en haut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
        </div>

        <p class="site-footer__disclaimer">
            Ce site a une vocation informative et pédagogique. Il ne remplace en aucun cas les conseils personnalisés d'un expert-comptable ou d'un avocat.
        </p>
    </div>
</footer>`;
    }

    // ─── INJECT ────────────────────────────────────────────────────────────────
    function init() {
        // Remove existing headers
        const existingHeaders = document.querySelectorAll('header, nav[role="navigation"][aria-label="Navigation principale"]:first-of-type');
        existingHeaders.forEach(el => {
            // Only remove if it's a top-level nav (not nested in a section)
            if (el.tagName === 'HEADER' || (el.tagName === 'NAV' && !el.closest('main') && !el.closest('footer') && !el.closest('section'))) {
                el.remove();
            }
        });

        // Remove existing mobile menus
        document.querySelectorAll('.mobile-menu, #mobileMenu, #navMobileOverlay, #navMobileMenu').forEach(el => el.remove());

        // Remove existing footers
        document.querySelectorAll('footer, #footerMain').forEach(el => el.remove());

        // Inject header at the beginning of body
        const headerWrapper = document.createElement('div');
        headerWrapper.innerHTML = createHeader();
        const headerEl = headerWrapper.firstElementChild;
        document.body.insertBefore(headerEl, document.body.firstChild);

        // Inject footer at the end of body (before scripts)
        const footerWrapper = document.createElement('div');
        footerWrapper.innerHTML = createFooter();
        const footerEl = footerWrapper.firstElementChild;

        // Find <main> and insert after it, or append to body
        const main = document.querySelector('main');
        if (main && main.nextSibling) {
            document.body.insertBefore(footerEl, main.nextSibling);
        } else {
            document.body.appendChild(footerEl);
        }

        // ─── Event Listeners ───────────────────────────────────────────────
        const navToggle = document.getElementById('navToggle');
        const navPanel = document.getElementById('navMobilePanel');
        const navOverlay = document.getElementById('navMobileOverlay');
        const navClose = document.getElementById('navMobileClose');

        function openMobileMenu() {
            navPanel.classList.add('site-nav-mobile--open');
            navOverlay.classList.add('site-nav-mobile__overlay--visible');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            navPanel.classList.remove('site-nav-mobile--open');
            navOverlay.classList.remove('site-nav-mobile__overlay--visible');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        if (navToggle) navToggle.addEventListener('click', openMobileMenu);
        if (navClose) navClose.addEventListener('click', closeMobileMenu);
        if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

        // Header scroll effect
        const siteHeader = document.getElementById('siteHeader');
        if (siteHeader) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    siteHeader.classList.add('site-header--scrolled');
                } else {
                    siteHeader.classList.remove('site-header--scrolled');
                }
            });
            // Check initial scroll
            if (window.scrollY > 50) {
                siteHeader.classList.add('site-header--scrolled');
            }
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
