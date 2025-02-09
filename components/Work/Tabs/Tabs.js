import { useState } from "react";
import { motion } from "framer-motion";
import { Howl } from 'howler';

const TABS = [
  {
    id: "education",
    label: "Education",
  },
  {
    id: "competitive",
    label: "Competitive",
  },
  {
    id: "technical",
    label: "Technical",
  },
];

const Tab = ({ index, tab, activeTab, handleOnClick, setIsHovering }) => {
  return (
    <button
      onMouseDown={() => handleOnClick(index)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative px-4 py-1 rounded-full cursor-none"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {activeTab.value === tab.value && (
        <motion.div
          layoutId="clickedbutton"
          transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}
          className="absolute inset-0 bg-gray-dark-2 rounded-full"
        />
      )}

      <span
        className={cn(
          "relative text-white top-[3px] link",
          tab.value !== activeTab.value && "hover:text-gray-light-3"
        )}
      >
        {tab.title}
      </span>
    </button>
  );
};

const TabsContent = ({ tabs, isHovering }) => {
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, index) => {
        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - index * 0.1,
              top: isHovering ? index * -50 : 0,
              zIndex: -index,
              opacity: index < 3 ? 1 - index * 0.1 : 0,
            }}
            animate={{
              y: tab.value === tabs[0].value ? [0, 40, 0] : 0,
            }}
            className="w-full h-full absolute top-0 left-0 mt-36 md:mt-32"
          >
            {tab.content}
          </motion.div>
        );
      })}
    </div>
  );
};

const mouseClickSound = new Howl({
  src: ["/sounds/mouse-click.mp3"],
});

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            mouseClickSound.play();
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-gray-dark-3 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
