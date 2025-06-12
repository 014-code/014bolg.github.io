function setTabs() {
  let tabs = document.querySelectorAll(".tabs .nav-tabs");
  if (!tabs) return;

  tabs.forEach((tab) => {
    tab.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const parentTab = e.target.parentElement.parentElement.parentElement;
        const activeTab = parentTab.querySelector(".nav-tabs .active");
        if (activeTab) {
          activeTab.classList.remove("active");
        }
        
        const tabItem = e.target.parentElement;
        tabItem.classList.add("active");
        
        // Scroll the tab into view if it's partially hidden
        scrollTabIntoView(tabItem);
        
        const activeContent = parentTab.querySelector(".tab-content .active");
        if (activeContent) {
          activeContent.classList.remove("active");
        }
        
        parentTab.querySelector(e.target.className).classList.add("active");

        return false;
      });
    });
    
    // Initial scroll to active tab if exists
    const activeTab = tab.querySelector('.active');
    if (activeTab) {
      scrollTabIntoView(activeTab);
    }
  });
}

// Helper function to scroll tab into view if it's not fully visible
function scrollTabIntoView(tabElement) {
  if (!tabElement) return;
  
  const tabsContainer = tabElement.parentElement;
  const tabRect = tabElement.getBoundingClientRect();
  const containerRect = tabsContainer.getBoundingClientRect();
  
  // Check if tab is not fully visible
  if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
    // Calculate position to center the tab
    const scrollLeft = tabElement.offsetLeft - (tabsContainer.clientWidth / 2) + (tabElement.offsetWidth / 2);
    
    // Smooth scroll to the tab
    tabsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
}

try {
  swup.hooks.on("page:view", setTabs);
} catch (e) {}

document.addEventListener("DOMContentLoaded", setTabs);
