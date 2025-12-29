import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/articles';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showUpdated, setShowUpdated] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('articles');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Make sure the backend server is running.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      article.title?.toLowerCase().includes(q) ||
      article.content?.toLowerCase().includes(q) ||
      article.excerpt?.toLowerCase().includes(q)
    );
  });

  const originalArticles = filteredArticles.filter(a => !a.isUpdated);
  const updatedArticles = filteredArticles.filter(a => a.isUpdated);

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="logo" onClick={() => setCurrentPage('articles')} style={{cursor: 'pointer'}}>BeyondChats</h1>
            <nav className="nav">
              <a onClick={() => setCurrentPage('product')} style={{cursor: 'pointer'}}>Product</a>
              <a onClick={() => setCurrentPage('pricing')} style={{cursor: 'pointer'}}>Pricing</a>
              <a onClick={() => setCurrentPage('faq')} style={{cursor: 'pointer'}}>FAQ</a>
              <a onClick={() => setCurrentPage('contact')} style={{cursor: 'pointer'}}>Contact Us</a>
            </nav>
          </div>
          <button className="cta-button" onClick={() => setCurrentPage('product')}>Build your free chatbot</button>
        </div>
      </header>

      {currentPage === 'product' && <ProductSection onBack={() => setCurrentPage('articles')} />}
      {currentPage === 'pricing' && <PricingSection onBack={() => setCurrentPage('articles')} />}
      {currentPage === 'faq' && <ResourcesSection onBack={() => setCurrentPage('articles')} />}
      {currentPage === 'contact' && <ContactSection onBack={() => setCurrentPage('articles')} />}
      
      {currentPage === 'articles' && <div className="main-container">
        <div className="content-wrapper">
          <div className="articles-main">
            <div className="filters">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={showOriginal}
                  onChange={(e) => setShowOriginal(e.target.checked)}
                />
                <span>Show Original ({originalArticles.length})</span>
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={showUpdated}
                  onChange={(e) => setShowUpdated(e.target.checked)}
                />
                <span>Show AI-Enhanced ({updatedArticles.length})</span>
              </label>
            </div>

            {loading && <div className="loading">Loading articles...</div>}
            
            {error && <div className="error">{error}</div>}

            {!loading && !error && articles.length === 0 && (
              <div className="empty-state">
                <h2>No articles found</h2>
                <p>Run the scraper to fetch articles from BeyondChats</p>
                <code>cd backend && npm run scrape</code>
              </div>
            )}

            {!loading && !error && (
              <>
                {showOriginal && originalArticles.length > 0 && (
                  <div className="articles-list">
                    {originalArticles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        isOriginal={true}
                        onReadMore={() => setSelectedArticle(article)}
                      />
                    ))}
                  </div>
                )}

                {showUpdated && updatedArticles.length > 0 && (
                  <div className="articles-list">
                    {updatedArticles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        isOriginal={false}
                        onReadMore={() => setSelectedArticle(article)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="sidebar">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setSearchQuery('')}>🔍</button>
            </div>

            <div className="featured-section">
              <h2>Featured</h2>
              <div className="featured-list">
                {articles.slice(0, 5).map(article => (
                  <div 
                    key={article.id} 
                    className="featured-item"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <h3>{article.title}</h3>
                    <p className="featured-date">{article.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>}

      <footer className="footer">
        <div className="container">
          <p>Made by Sumit Singh Sengar | BeyondChats - {new Date().getFullYear()}</p>
        </div>
      </footer>

      {selectedArticle && (
        <FullScreenModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

function ProductSection({ onBack }) {
  return (
    <div className="section-page">
      <div className="section-container">
        <button className="back-button" onClick={onBack}>← Back to Articles</button>
        <h1>Our Products</h1>
        <div className="product-grid">
          <div className="product-card">
            <h2>AI Chatbot Platform</h2>
            <p>Build chatbots for customer service and lead generation.</p>
            <ul>
              <li>Natural Language Processing</li>
              <li>Multi-channel support</li>
              <li>24/7 automated responses</li>
              <li>Easy integration</li>
            </ul>
          </div>
          <div className="product-card">
            <h2>Analytics Dashboard</h2>
            <p>Track your chatbot performance.</p>
            <ul>
              <li>Real-time analytics</li>
              <li>User behavior tracking</li>
              <li>Performance metrics</li>
              <li>Custom reports</li>
            </ul>
          </div>
          <div className="product-card">
            <h2>Integration Suite</h2>
            <p>Connect with popular tools.</p>
            <ul>
              <li>CRM integration</li>
              <li>API access</li>
              <li>Webhook support</li>
              <li>Third-party plugins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingSection({ onBack }) {
  return (
    <div className="section-page">
      <div className="section-container">
        <button className="back-button" onClick={onBack}>← Back to Articles</button>
        <h1>Pricing Plans</h1>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h2>Starter</h2>
            <div className="price">₹9<span>/month</span></div>
            <ul>
              <li>500 conversations/month</li>
              <li>Basic features</li>
              <li>Email support</li>
              <li>1 chatbot</li>
              <li>Basic analytics</li>
            </ul>
            <button className="pricing-btn">Get Started</button>
          </div>
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h2>Professional</h2>
            <div className="price">₹49<span>/month</span></div>
            <ul>
              <li>5,000 conversations/month</li>
              <li>Advanced AI features</li>
              <li>Priority support</li>
              <li>5 chatbots</li>
              <li>Advanced analytics</li>
              <li>Custom branding</li>
              <li>API access</li>
            </ul>
            <button className="pricing-btn primary">Start Free Trial</button>
          </div>
          <div className="pricing-card">
            <h2>Enterprise</h2>
            <div className="price">₹99<span>/month</span></div>
            <ul>
              <li>Unlimited conversations</li>
              <li>Unlimited chatbots</li>
              <li>Dedicated support</li>
              <li>Custom integrations</li>
              <li>Advanced security</li>
              <li>SLA guarantee</li>
              <li>White-label solution</li>
              <li>Training included</li>
            </ul>
            <button className="pricing-btn">Choose Enterprise</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesSection({ onBack }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How long does it take to integrate your chatbot?",
      answer: "Integration takes around 10 minutes. Copy our script and paste it into your website's HTML."
    },
    {
      question: "Do I need a credit card for the starter plan?",
      answer: "No credit card required for the ₹9/month plan. Start immediately and upgrade anytime."
    },
    {
      question: "Can you integrate with our CRM?",
      answer: "Yes. We support Salesforce, HubSpot, Zoho, and custom integrations via API."
    },
    {
      question: "How will I get the details of the leads?",
      answer: "Lead info is in your dashboard. Export to CSV, send to CRM, or get webhook notifications."
    },
    {
      question: "What if I want to cancel my subscription?",
      answer: "Cancel anytime from account settings. No fees. Data accessible for 30 days."
    },
    {
      question: "Is my user data secure?",
      answer: "Yes. We use SSL/TLS encryption, comply with GDPR, and never share data with third parties."
    },
    {
      question: "There are so many chatbots. How to choose?",
      answer: "BeyondChats has easy setup, affordable pricing, good AI, and local support."
    }
  ];

  return (
    <div className="section-page">
      <div className="section-container">
        <button className="back-button" onClick={onBack}>← Back to Articles</button>
        
        <h1 className="faq-title">
          Frequently <span className="highlight">Asked Questions</span>
        </h1>
        
        <div className="faq-layout">
          <div className="faq-questions">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                <div 
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-cards">
            <div className="faq-card">
              <h3>How to boost sales using chatbot?</h3>
              <button className="faq-card-btn">Click to know how →</button>
            </div>

            <div className="faq-card">
              <h3>How chatbots solve customer service issues?</h3>
              <button className="faq-card-btn">Get started →</button>
            </div>

            <div className="faq-card">
              <h3>View All FAQs and Resources</h3>
              <button className="faq-card-btn">View All →</button>
            </div>
          </div>
        </div>

        <div className="resources-grid" style={{marginTop: '4rem'}}>
          <div className="resource-card">
            <h2>Documentation</h2>
            <p>API docs and integration guides.</p>
            <a href="#docs" className="resource-link">Read Docs →</a>
          </div>
          <div className="resource-card">
            <h2>Tutorials</h2>
            <p>Step-by-step guides to get started.</p>
            <a href="#tutorials" className="resource-link">View Tutorials →</a>
          </div>
          <div className="resource-card">
            <h2>Blog</h2>
            <p>Latest updates and tips.</p>
            <a href="#blog" className="resource-link">Read Blog →</a>
          </div>
          <div className="resource-card">
            <h2>Video Guides</h2>
            <p>Video tutorials and walkthroughs.</p>
            <a href="#videos" className="resource-link">Watch Videos →</a>
          </div>
          <div className="resource-card">
            <h2>Community</h2>
            <p>Connect with other developers.</p>
            <a href="#community" className="resource-link">Join Community →</a>
          </div>
          <div className="resource-card">
            <h2>Case Studies</h2>
            <p>Success stories from our users.</p>
            <a href="#cases" className="resource-link">View Cases →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection({ onBack }) {
  return (
    <div className="section-page">
      <div className="section-container">
        <button className="back-button" onClick={onBack}>← Back to Articles</button>
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email</strong>
                <a href="mailto:sengarsumit7047@gmail.com">sengarsumit7047@gmail.com</a>
              </div>
              <div className="contact-item">
                <strong>Support</strong>
                <p>Available for all users</p>
              </div>
              <div className="contact-item">
                <strong>Office Hours</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send a Message</h2>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              alert('Thanks! We will get back to you soon.'); 
            }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Your Message" rows="6" required></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatArticleContent(content) {
  if (!content) return null;
  
  const lines = content.split('\n').filter(line => line.trim());
  const result = [];
  let idx = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // check if heading
    const isHeading = (line.endsWith(':') || line.endsWith('?')) && line.length < 100;
    
    if (isHeading) {
      result.push(
        <h2 key={idx++} className="content-heading">
          {line.replace(/:/g, '')}
        </h2>
      );
    } else if (line.length > 20) {
      result.push(
        <p key={idx++} className="content-paragraph">
          {line}
        </p>
      );
    }
  }
  
  return result;
}

function FullScreenModal({ article, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {article.image && (
          <img src={article.image} alt={article.title} className="modal-image" />
        )}
        
        <h1 className="modal-title">{article.title}</h1>
        
        {article.date && (
          <div className="modal-meta">
            <span className="modal-date">{article.date}</span>
            {article.isUpdated && <span className="modal-badge">AI-Enhanced</span>}
          </div>
        )}
        
        <div className="modal-text">
          {formatArticleContent(article.content)}
        </div>

        {article.references && article.references.length > 0 && (
          <div className="modal-references">
            <h3>References:</h3>
            <ul>
              {article.references.map((ref, index) => (
                <li key={index}>
                  <a href={ref} target="_blank" rel="noopener noreferrer">
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.url && (
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="modal-source-link"
          >
            View Original Source →
          </a>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article, isOriginal, onReadMore }) {
  const contentToShow = article.excerpt || article.content?.substring(0, 150) + '...';

  return (
    <div className="blog-card">
      {article.image && (
        <div className="blog-image-wrapper">
          <img src={article.image} alt={article.title} className="blog-image" />
        </div>
      )}
      
      <div className="blog-content">
        <div className="blog-category">
          {isOriginal ? '# ORIGINAL' : '# AI ENHANCED'}
        </div>
        
        <h3 className="blog-title" onClick={onReadMore}>
          {article.title}
        </h3>
        
        <p className="blog-excerpt">{contentToShow}</p>
        
        <div className="blog-footer">
          <div className="blog-author">
            <span className="author-name">ADMIN</span>
            <span className="blog-date">{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
