import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

interface Tab {
  id: string;
  number: string;
  label: string;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "work",
    number: "01",
    label: "Previous Work",
    content: (
      <>
        <h2>Previous Work</h2>
        <p>Company / Role — Year – Year</p>
        <p>Brief description of what you did and what you built.</p>
        <p>Company / Role — Year – Year</p>
        <p>Brief description of what you did and what you built.</p>
      </>
    ),
  },
  {
    id: "school",
    number: "02",
    label: "School",
    content: (
      <>
        <h2>School</h2>
        <p>University / Program — Year</p>
        <p>Brief notes on your studies, focus areas, or notable projects.</p>
      </>
    ),
  },
  {
    id: "skills",
    number: "03",
    label: "Skills",
    content: (
      <>
        <h2>Skills</h2>
        <p>HTML · CSS · JavaScript · TypeScript · Astro · React</p>
        <p>Accessibility · Design Systems · CSS Architecture · Performance</p>
        <p>Figma · Git · Node.js</p>
      </>
    ),
  },
  {
    id: "hobbies",
    number: "04",
    label: "Hobbies",
    content: (
      <>
        <h2>Hobbies</h2>
        <p>Tell me what you like to do outside of work.</p>
        <p>Add as many paragraphs as you want here.</p>
      </>
    ),
  },
];

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState("work");

  return (
    <>
      {/* ── Mobile: Radix Accordion ──────────────────────────── */}
      <div className="about-tabs-accordion">
        <Accordion.Root type="single" collapsible defaultValue="work">
          {tabs.map((tab) => (
            <Accordion.Item
              key={tab.id}
              value={tab.id}
              className="accordion-item"
            >
              <Accordion.Header className="accordion-header">
                <Accordion.Trigger className="tab-btn accordion-trigger">
                  <span>{tab.number}</span>
                  <div>{tab.label}</div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content">
                <div className="accordion-content-inner">{tab.content}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      {/* ── Desktop: Side-panel tabs ─────────────────────────── */}
      <div className="about-tabs about-tabs-desktop">
        <nav className="about-tabs__nav" aria-label="About sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              <span>{tab.number}</span>
              <div>{tab.label}</div>
            </button>
          ))}
        </nav>
        <div className="about-tabs__content">
          <div className="tab-panel active">
            {tabs.find((t) => t.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </>
  );
}
