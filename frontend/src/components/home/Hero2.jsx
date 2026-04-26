import { Link } from "react-router-dom";
import { Search, Home } from "lucide-react";

const propertySettings = {
  totalRooms: 5,
  pricePerDay: 85,
};

const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f6;
          padding: 48px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: hidden;
          min-height: 560px;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: #e8e0d4;
          opacity: 0.4;
          pointer-events: none;
        }
        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1a1a1a;
          color: #faf9f6;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .hero-pill-dot {
          width: 6px;
          height: 6px;
          background: #c9a96e;
          border-radius: 50%;
          display: inline-block;
        }
        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 58px;
          font-weight: 300;
          line-height: 1.1;
          color: #1a1a1a;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }
        .hero-headline em {
          font-style: italic;
          color: #c9a96e;
        }
        .hero-subtext {
          font-size: 15px;
          color: #6b6460;
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 36px;
          font-weight: 300;
        }
        .hero-search-card {
          background: #fff;
          border: 0.5px solid #e2ddd8;
          border-radius: 16px;
          padding: 6px;
          display: flex;
          align-items: stretch;
          box-shadow: 0 2px 24px rgba(0,0,0,0.06);
        }
        .hero-field {
          flex: 1;
          padding: 12px 18px;
          border-right: 0.5px solid #e2ddd8;
        }
        .hero-field-label {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b0a89e;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .hero-field-input,
        .hero-field-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        .hero-book-btn {
          background: #c9a96e;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hero-book-btn:hover { background: #b8925a; }
        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 28px;
        }
        .hero-stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 11px;
          color: #9e9590;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 4px;
          font-weight: 400;
        }
        .hero-stat-divider {
          width: 0.5px;
          background: #ddd8d2;
          align-self: stretch;
        }
        .hero-image-side {
          position: relative;
          height: 460px;
        }
        .hero-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          display: block;
        }
        .hero-image-overlay {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(to bottom, transparent 50%, rgba(20,16,12,0.35) 100%);
        }
        .hero-rating-badge,
        .hero-price-badge {
          position: absolute;
          background: rgba(255,255,255,0.95);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }
        .hero-rating-badge {
          top: 20px;
          right: 20px;
          padding: 12px 16px;
        }
        .hero-price-badge {
          bottom: 20px;
          left: 20px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-price-icon {
          width: 36px;
          height: 36px;
          background: #c9a96e;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-price-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1;
        }
        .hero-price-label {
          font-size: 11px;
          color: #9e9590;
          letter-spacing: 0.04em;
        }
        .hero-accent-shape {
          position: absolute;
          bottom: -16px;
          right: -16px;
          width: 120px;
          height: 120px;
          border: 0.5px solid #c9a96e;
          border-radius: 20px;
          z-index: -1;
          opacity: 0.5;
        }
        .hero-stars { color: #c9a96e; font-size: 13px; letter-spacing: 2px; }
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; padding: 32px 24px; }
          .hero-headline { font-size: 40px; }
          .hero-image-side { height: 280px; }
          .hero-search-card { flex-direction: column; }
          .hero-field { border-right: none; border-bottom: 0.5px solid #e2ddd8; }
          .hero-stats { gap: 20px; }
        }
      `}</style>

      <section className="hero-section">
        {/* Left content */}
        <div>
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Private guest house
          </div>

          <h1 className="hero-headline">
            The Comfort
            <br />
            of Home.
            <br />
            <em>
              The Luxury
              <br />
              of a Hotel.
            </em>
          </h1>

          <p className="hero-subtext">
            An exclusive residence offering {propertySettings.totalRooms}{" "}
            private rooms with premium amenities. Book by the day, starting at $
            {propertySettings.pricePerDay} — no minimums, no compromises.
          </p>

          {/* Search bar */}
          <div className="hero-search-card">
            <div className="hero-field">
              <div className="hero-field-label">Check in</div>
              <input
                type="text"
                placeholder="Select date"
                className="hero-field-input"
              />
            </div>
            <div className="hero-field">
              <div className="hero-field-label">Room type</div>
              <select className="hero-field-select">
                <option>Any room</option>
                <option>Master Suite</option>
                <option>Garden View</option>
              </select>
            </div>
            <Link to="/rooms" className="hero-book-btn">
              <Search size={14} />
              Book Now
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div>
              <div className="hero-stat-number">
                {propertySettings.totalRooms}
              </div>
              <div className="hero-stat-label">Private rooms</div>
            </div>
            <div className="hero-stat-divider" />
            <div>
              <div className="hero-stat-number">
                ${propertySettings.pricePerDay}
              </div>
              <div className="hero-stat-label">Per night</div>
            </div>
            <div className="hero-stat-divider" />
            <div>
              <div className="hero-stat-number">4.9</div>
              <div className="hero-stat-label">Guest rating</div>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-image-side">
          <img
            className="hero-main-image"
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
            alt="Boutique guest house"
          />
          <div className="hero-image-overlay" />

          {/* Rating badge */}
          <div className="hero-rating-badge">
            <div className="hero-stars">★★★★★</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "#4a4540" }}>
              <strong>4.9</strong>
              <span style={{ color: "#9e9590" }}> · 138 reviews</span>
            </div>
          </div>

          {/* Price badge */}
          <div className="hero-price-badge">
            <div className="hero-price-icon">
              <Home size={16} color="#fff" />
            </div>
            <div>
              <div className="hero-price-amount">
                ${propertySettings.pricePerDay}
                <span style={{ fontSize: 14, fontWeight: 300 }}>/day</span>
              </div>
              <div className="hero-price-label">
                {propertySettings.totalRooms} rooms available
              </div>
            </div>
          </div>

          <div className="hero-accent-shape" />
        </div>
      </section>
    </>
  );
};

export default Hero;
