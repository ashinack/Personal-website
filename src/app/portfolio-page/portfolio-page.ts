import { Component, DOCUMENT, Inject, Renderer2, signal } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faMoon,
  faSun,
  faMapMarkerAlt,
  faCalendarAlt,
  faGraduationCap,
  faBriefcase,
  faPhone,
  faPlayCircle,
  faPencilRuler,
  faCode,
  faArrowRight,
  faChevronRight,
  faEnvelope,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faGithub,
  faDribbble,
  faBehance,
  faInstagram,
  faWhatsapp,
  faTelegram as faTelegramBrand,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-portfolio-page',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.css',
})
export class PortfolioPage {
  private listeners: (() => void)[] = [];

  // public icon references for template
  public faMoon = faMoon;
  public faSun = faSun;
  public faTelegramPlane = faTelegramPlane;
  public faGithub = faGithub;
  public faDribbble = faDribbble;
  public faBehance = faBehance;
  public faInstagram = faInstagram;
  public faWhatsapp = faWhatsapp;
  public faTelegramBrand = faTelegramBrand;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faCalendarAlt = faCalendarAlt;
  public faGraduationCap = faGraduationCap;
  public faBriefcase = faBriefcase;
  public faPhone = faPhone;
  public faPlayCircle = faPlayCircle;
  public faPencilRuler = faPencilRuler;
  public faCode = faCode;
  public faArrowRight = faArrowRight;
  public faChevronRight = faChevronRight;
  public faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;
  faDatabase = faDatabase;

  public isDark = false;
  public mobileMenuOpen = false;

  constructor(
    private toastr: ToastrService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document,
    private library: FaIconLibrary,
  ) {
    // add icons to library (optional but useful)
    this.library.addIcons(
      faMoon,
      faSun,
      faTelegramPlane,
      faGithub,
      faDribbble,
      faBehance,
      faInstagram,
      faWhatsapp,
      faTelegramBrand,
      faMapMarkerAlt,
      faCalendarAlt,
      faGraduationCap,
      faBriefcase,
      faPhone,
      faPlayCircle,
      faPencilRuler,
      faCode,
      faArrowRight,
      faChevronRight,
      faEnvelope,
    );
  }

  ngOnInit(): void {
    this.loadSavedTheme();
  }

  ngAfterViewInit(): void {
    // this.attachThemeToggleHandlers();
    this.attachSmoothScroll();
    this.initObserverAnimations();
    this.attachScrollHandlers();
    this.attachMouseMoveParallax();
    this.initCursorFollow();
    this.initRippleEffect();
    // this.initFormHandler();
    this.fadeInOnLoad();
  }

  ngOnDestroy(): void {
    // remove all listeners
    this.listeners.forEach((un) => un());
    this.listeners = [];
  }

  // -------------------------
  // Theme Toggle
  // -------------------------
  // Toggle theme called from template
  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(this.doc.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.doc.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  private loadSavedTheme(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDark = true;
      this.renderer.addClass(this.doc.body, 'dark-theme');
    } else {
      this.isDark = false;
      this.renderer.removeClass(this.doc.body, 'dark-theme');
    }
  }

  // -------------------------
  // Mobile Menu
  // -------------------------
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // private attachThemeToggleHandlers(): void {
  //   const themeToggleBtns = Array.from(
  //     this.doc.querySelectorAll<HTMLElement>(
  //       '.theme-toggle, .theme-toggle-nav',
  //     ),
  //   );
  //   themeToggleBtns.forEach((btn) => {
  //     const un = this.renderer.listen(btn, 'click', () => this.toggleTheme());
  //     this.listeners.push(un);
  //   });
  // }

  // -------------------------
  // Scroll and Parallax
  // -------------------------
  private attachScrollHandlers(): void {
    const unScroll = this.renderer.listen('window', 'scroll', () => {
      const scrolled = window.pageYOffset || this.doc.documentElement.scrollTop;
      // hero shapes parallax
      const shapes = Array.from(
        this.doc.querySelectorAll<HTMLElement>('.shape'),
      );
      shapes.forEach((shape, index) => {
        const speed = 0.3 + index * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
          scrolled * 0.05
        }deg)`;
      });

      const aboutShape = this.doc.querySelector<HTMLElement>('.shape-4');
      if (aboutShape) {
        aboutShape.style.transform = `translateY(${-50 + scrolled * 0.2}%)`;
      }

      // Active nav on scroll
      const sections = Array.from(
        this.doc.querySelectorAll<HTMLElement>('section[id]'),
      );
      const scrollPos =
        (window.pageYOffset || this.doc.documentElement.scrollTop) + 100;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (sectionId) {
          if (
            scrollPos >= sectionTop &&
            scrollPos < sectionTop + sectionHeight
          ) {
            const links = Array.from(
              this.doc.querySelectorAll<HTMLElement>('.nav-link'),
            );
            links.forEach((link) => link.classList.remove('active'));
            const active = this.doc.querySelector<HTMLElement>(
              `.nav-link[href="#${sectionId}"]`,
            );
            if (active) active.classList.add('active');
          }
        }
      });

      // reveal sections
      this.revealSections();
    });
    this.listeners.push(unScroll);
  }

  private revealSections(): void {
    const sections = Array.from(
      this.doc.querySelectorAll<HTMLElement>('.parallax-section'),
    );
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }

  // -------------------------
  // Smooth scroll for anchor links
  // -------------------------
  private attachSmoothScroll(): void {
    const anchors = Array.from(
      this.doc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    anchors.forEach((anchor) => {
      const un = this.renderer.listen(anchor, 'click', (e: Event) => {
        e.preventDefault();
        const href = anchor.getAttribute('href') || '';
        const target = this.doc.querySelector<HTMLElement>(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          const links = Array.from(
            this.doc.querySelectorAll<HTMLElement>('.nav-link'),
          );
          links.forEach((link) => link.classList.remove('active'));
          anchor.classList.add('active');
        }
      });
      this.listeners.push(un);
    });
  }

  // -------------------------
  // Intersection Observer animations
  // -------------------------
  private observer?: IntersectionObserver;
  private initObserverAnimations(): void {
    const options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, options);

    const animated = Array.from(
      this.doc.querySelectorAll<HTMLElement>(
        '.project-card, .service-card, .contact-item',
      ),
    );
    animated.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer!.observe(el);
    });

    // initial parallax-section setup
    const sections = Array.from(
      this.doc.querySelectorAll<HTMLElement>('.parallax-section'),
    );
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    this.revealSections();
  }

  // -------------------------
  // Mouse move parallax inside hero
  // -------------------------
  private attachMouseMoveParallax(): void {
    const hero = this.doc.querySelector<HTMLElement>('.hero');
    if (!hero) return;
    const un = this.renderer.listen(hero, 'mousemove', (e: MouseEvent) => {
      const shapes = Array.from(hero.querySelectorAll<HTMLElement>('.shape'));
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
    this.listeners.push(un);
  }

  // -------------------------
  // Cursor follow (optional)
  // -------------------------
  private initCursorFollow(): void {
    const cursor = this.renderer.createElement('div');
    this.renderer.addClass(cursor, 'custom-cursor');
    this.renderer.appendChild(this.doc.body, cursor);

    const style = this.renderer.createElement('style');
    style.textContent = `
      .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-blue);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
      }
      .custom-cursor.active {
        opacity: 1;
        transform: scale(1.5);
      }
      @media (max-width: 768px) {
        .custom-cursor { display: none; }
      }
    `;
    this.renderer.appendChild(this.doc.head, style);

    const unMove = this.renderer.listen(
      'document',
      'mousemove',
      (e: MouseEvent) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
      },
    );
    const unLeave = this.renderer.listen('document', 'mouseleave', () => {
      cursor.style.opacity = '0';
    });
    this.listeners.push(unMove, unLeave);

    const clickables = Array.from(
      this.doc.querySelectorAll<HTMLElement>(
        'a, button, .project-card, .service-card',
      ),
    );
    clickables.forEach((el) => {
      const enter = this.renderer.listen(el, 'mouseenter', () =>
        cursor.classList.add('active'),
      );
      const leave = this.renderer.listen(el, 'mouseleave', () =>
        cursor.classList.remove('active'),
      );
      this.listeners.push(enter, leave);
    });
  }

  // -------------------------
  // Ripple effect for buttons
  // -------------------------
  private initRippleEffect(): void {
    const buttons = Array.from(
      this.doc.querySelectorAll<HTMLElement>('.btn, .filter-btn'),
    );
    buttons.forEach((button) => {
      // ensure positioning
      this.renderer.setStyle(button, 'position', 'relative');
      this.renderer.setStyle(button, 'overflow', 'hidden');
      const un = this.renderer.listen(button, 'click', (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = this.renderer.createElement('span');
        this.renderer.addClass(ripple, 'ripple');
        ripple.style.width = ripple.style.height = size + 'px';
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.renderer.appendChild(button, ripple);
        setTimeout(() => {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
      });
      this.listeners.push(un);
    });

    const rippleStyle = this.renderer.createElement('style');
    rippleStyle.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    this.renderer.appendChild(this.doc.head, rippleStyle);
  }

  // -------------------------
  // Simple form handler
  // -------------------------
  // private initFormHandler(): void {
  //   const contactForm =
  //     this.doc.querySelector<HTMLFormElement>('.contact-form');
  //   if (!contactForm) return;
  //   const un = this.renderer.listen(contactForm, 'submit', (e: Event) => {
  //     e.preventDefault();
  //     const nameEl =
  //       contactForm.querySelector<HTMLInputElement>('input[type="text"]');
  //     const emailEl = contactForm.querySelector<HTMLInputElement>(
  //       'input[type="email"]',
  //     );
  //     const messageEl =
  //       contactForm.querySelector<HTMLTextAreaElement>('textarea');
  //     const name = nameEl?.value || '';
  //     const email = emailEl?.value || '';
  //     const message = messageEl?.value || '';
  //     if (name && email && message) {
  //       alert('Thank you for your message! I will get back to you soon.');
  //       contactForm.reset();
  //     } else {
  //       alert('Please fill in all fields.');
  //     }
  //   });
  //   this.listeners.push(un);
  // }

  // -------------------------
  // Fade-in on load
  // -------------------------
  private fadeInOnLoad(): void {
    const unLoad = this.renderer.listen('window', 'load', () => {
      this.doc.body.style.opacity = '0';
      setTimeout(() => {
        this.doc.body.style.transition = 'opacity 0.5s ease';
        this.doc.body.style.opacity = '1';
      }, 100);
    });
    this.listeners.push(unLoad);
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'My_Resume.pdf';
    link.click();
  }

  openDemo(app: string) {
    switch (app) {
      case 'weatherapp':
        window.open('https://ashinack.github.io/angular_weather/', '_blank');
        break;
      case 'calculator':
        window.open('https://ashinack.github.io/New-Calculator/', '_blank');
        break;
      case 'appleClone':
        window.open('https://ashinack.github.io/apple_clone/', '_blank');
        break;
      case 'dashboard':
        window.open(
          'https://github.com/ashinack/Ai_powered_analysis_frontend',
          '_blank',
        );
        break;
      default:
        window.open('https://ashinack.github.io/angular_weather/', '_blank');
    }
  }

  experiences = signal([
    {
      role: 'Lead Product Designer',
      company: 'Studio 77',
      period: '2021 - Present',
      color: 'rgba(192, 132, 252, 0.6)', // Purple glow
      description: [
        'Lead creation of intuitive user interfaces for mobile & web apps.',
        'Mentored junior designers and conducted design reviews.',
        'Implemented Design System to ensure consistent user experience across products.',
      ],
    },
    {
      role: 'Senior UI/UX Designer',
      company: 'Innovatech',
      period: '2018 - 2021',
      color: 'rgba(59, 130, 246, 0.6)', // Blue glow
      description: [
        'Designed and validated features for a market-leading SaaS platform.',
        'Conducted user research and usability testing to iterate on designs.',
        'Collaborated with cross-functional teams to define and deliver features.',
      ],
    },
    {
      role: 'UI/UX Designer',
      company: 'Creative Solutions',
      period: '2016 - 2018',
      color: 'rgba(52, 211, 153, 0.6)', // Green glow
      description: [
        'Developed concepts, wireframes, and prototypes for diverse clients.',
        'Worked closely with developers to implement pixel-perfect designs.',
        'Translated business requirements into compelling user experiences.',
      ],
    },
  ]);

  sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1n41ayt',
        'template_meva6gb',
        e.target as HTMLFormElement,
        'RX3qZAFGfGk6gNVnt',
      )
      .then(
        (result) => {
          const form = e.target as HTMLFormElement;
          form.reset();
          console.log('Email sent!', result.text);
          this.toastr.success('Email sent successfully!', 'Success');
        },
        (error) => {
          console.log('Failed...', error.text);
          this.toastr.error('Failed to send email.', 'Error');
        },
      );
  }
}
