import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe os estilos do Bootstrap

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${index === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
