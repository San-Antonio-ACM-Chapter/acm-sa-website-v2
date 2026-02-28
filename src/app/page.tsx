import './home.css';

export default function Home() {
  return (
    <>
      {/* Fixed Navigation Header */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo/Brand */}
            <div className="navbar-brand">
              <div className="brand-text">
                ACM San Antonio
              </div>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#events" className="nav-link">
                Events
              </a>
              <a href="#team" className="nav-link">
                Team
              </a>
              <a href="#contact" className="nav-link nav-link-cta">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">ACM SA</span>
          </h1>
          <p className="hero-subtitle">
            Join San Antonio's premier technology and computing community
          </p>
        </section>

        {/* Placeholder sections for navigation */}
        <section id="about" className="content-section content-section-white">
          <div className="section-content">
            <h2 className="section-title">About Us</h2>
            <p className="section-text">Learn more about ACM San Antonio</p>
          </div>
        </section>

        <section id="events" className="content-section content-section-gray">
          <div className="section-content">
            <h2 className="section-title">Events</h2>
            <p className="section-text">Check out our upcoming events and workshops</p>
          </div>
        </section>

        <section id="team" className="content-section content-section-white">
          <div className="section-content">
            <h2 className="section-title">Our Team</h2>
            <p className="section-text">Meet the people behind ACM SA</p>
          </div>
        </section>

        <section id="contact" className="content-section content-section-gray">
          <div className="section-content">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-text">Get in touch with our team</p>
          </div>
        </section>
      </main>
    </>
  );
}
