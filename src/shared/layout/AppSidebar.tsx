import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

import { ChevronDownIcon, HorizontaLDots } from "../icons";
import { useSidebar } from "../../app/providers/SidebarContext.tsx";
import { NavItem, navItems } from "../data/navItemsData.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Empleado } from "../../entities/empleados";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const queryClient = useQueryClient();
  const empleado = queryClient.getQueryData<Empleado>(["empleado"]);

  const hasAccess = useCallback(
      (itemRoles?: string[]) => {
        if (!itemRoles || itemRoles.length === 0) return true;
        return itemRoles.includes(empleado?.rol || "");
      },
      [empleado?.rol]
  );

  const filteredNavItems = useMemo(() => {
    return navItems
        .filter((item) => hasAccess(item.roles))
        .map((item) => ({
          ...item,
          subItems: item.subItems?.filter((sub) => hasAccess(sub.roles)),
        }))
        .filter((item) => item.path || (item.subItems && item.subItems.length > 0));
  }, [hasAccess]);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
      {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
      (path: string) => location.pathname === path,
      [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    // Iterate through filteredNavItems instead of raw navItems
    filteredNavItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main", // Assuming only 'main' for now as 'othersItems' is commented out
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, filteredNavItems]); // Add filteredNavItems to dependency array

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
          prevOpenSubmenu &&
          prevOpenSubmenu.type === menuType &&
          prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  // --- Framer Motion Variants ---

  // Variants for the main sidebar container
  const sidebarVariants = {
    // Desktop states
    collapsed: {
      width: '90px',
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    expanded: {
      width: '290px',
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    // Mobile states (controlled by translate-x)
    mobileClosed: {
      x: "-100%",
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    mobileOpen: {
      x: "0%",
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
  };

  // Variants for elements inside the sidebar that fade/move
  const contentFadeVariants = {
    hidden: { opacity: 0, x: -10, transition: { duration: 0.15 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25, delay: 0.1 } },
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
      <ul className="flex flex-col gap-4">
        {items.map((nav, index) => (
            <li key={nav.name}>
              {nav.subItems ? (
                  <motion.button // Use motion.button for animation
                      onClick={() => handleSubmenuToggle(index, menuType)}
                      className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      } cursor-pointer ${!isExpanded && !isHovered
                          ? "lg:justify-center"
                          : "lg:justify-start"
                      }`}
                      initial={false} // Prevent initial animation on load for buttons
                      // Animate based on sidebar state for text visibility
                      animate={(isExpanded || isHovered || isMobileOpen) ? "visible" : "hidden"}
                      variants={contentFadeVariants}
                  >
              <span
                  className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <motion.span className="menu-item-text" variants={contentFadeVariants}>
                          {nav.name}
                        </motion.span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <motion.span // Wrap ChevronDownIcon in motion.span to animate its rotation
                            className={`ml-auto w-5 h-5 transition-transform duration-200`}
                            animate={{
                              rotate:
                                  openSubmenu?.type === menuType && openSubmenu?.index === index
                                      ? 180
                                      : 0,
                              color:
                                  openSubmenu?.type === menuType && openSubmenu?.index === index
                                      ? "rgb(234 88 12)" // Tailwind orange-500
                                      : "rgb(107 114 128)", // Tailwind gray-500
                            }}
                            transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="w-5 h-5" />
                        </motion.span>
                    )}
                  </motion.button>
              ) : (
                  nav.path && (
                      <motion.div // Wrap Link in motion.div for animation
                          initial={false} // Prevent initial animation on load for links
                          animate={(isExpanded || isHovered || isMobileOpen) ? "visible" : "hidden"}
                          variants={contentFadeVariants}
                      >
                        <Link
                            to={nav.path}
                            className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                            }`}
                        >
                  <span
                      className={`menu-item-icon-size ${isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                  >
                    {nav.icon}
                  </span>
                          {(isExpanded || isHovered || isMobileOpen) && (
                              <motion.span className="menu-item-text" variants={contentFadeVariants}>
                                {nav.name}
                              </motion.span>
                          )}
                        </Link>
                      </motion.div>
                  )
              )}
              {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <motion.div // Use motion.div for the submenu container
                      ref={(el) => {
                        subMenuRefs.current[`${menuType}-${index}`] = el;
                      }}
                      className="overflow-hidden" // Remove static transition-all as motion handles it
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height:
                            openSubmenu?.type === menuType && openSubmenu?.index === index
                                ? subMenuHeight[`${menuType}-${index}`]
                                : 0,
                        opacity:
                            openSubmenu?.type === menuType && openSubmenu?.index === index
                                ? 1
                                : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                                to={subItem.path}
                                className={`menu-dropdown-item ${isActive(subItem.path)
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`}
                            >
                              {subItem.name}
                              <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                            <span
                                className={`ml-auto ${isActive(subItem.path)
                                    ? "menu-dropdown-badge-active"
                                    : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge`}
                            >
                            new
                          </span>
                        )}
                                {subItem.pro && (
                                    <span
                                        className={`ml-auto ${isActive(subItem.path)
                                            ? "menu-dropdown-badge-active"
                                            : "menu-dropdown-badge-inactive"
                                        } menu-dropdown-badge`}
                                    >
                            pro
                          </span>
                                )}
                      </span>
                            </Link>
                          </li>
                      ))}
                    </ul>
                  </motion.div>
              )}
            </li>
        ))}
      </ul>
  );

  const displayFullContent = isExpanded || isHovered || isMobileOpen;

  return (
      <motion.aside // Use motion.aside for the main sidebar
          className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen z-40 border-r border-gray-200 lg:translate-x-0`}
          // Removed all transition-all and width/translate-x classes from here
          // as Framer Motion will control these directly via the 'animate' prop.
          onMouseEnter={() => !isExpanded && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={sidebarVariants}
          // Determine the current animation state based on mobile/desktop and expanded/hovered
          animate={
            isMobileOpen
                ? "mobileOpen"
                : isExpanded || isHovered
                    ? "expanded"
                    : "collapsed"
          }
          initial={isMobileOpen ? "mobileClosed" : "collapsed"} // Initial state based on mobile
      >
        <div
            className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
        >
          <Link to="/">
            <AnimatePresence mode="wait">
              {displayFullContent ? (
                  <motion.div
                      key="full-logo" // Unique key for AnimatePresence
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                  >
                    <img
                        className="dark:hidden"
                        src="/images/logo/logo.svg"
                        alt="Logo"
                        width={150}
                        height={40}
                    />
                    <img
                        className="hidden dark:block"
                        src="/images/logo/logo-dark.svg"
                        alt="Logo"
                        width={150}
                        height={40}
                    />
                  </motion.div>
              ) : (
                  <motion.div
                      key="icon-logo" // Unique key for AnimatePresence
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                  >
                    <img
                        src="/images/logo/logo-icon.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                  </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <motion.h2 // Animate the "Menu" title/icon
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                    variants={contentFadeVariants}
                    initial={false} // Prevent initial animation on load
                    animate={displayFullContent ? "visible" : "hidden"}
                >
                  {displayFullContent ? (
                      "Menu"
                  ) : (
                      <HorizontaLDots className="size-6" />
                  )}
                </motion.h2>
                {renderMenuItems(filteredNavItems, "main")}
              </div>
              {/* ... other items if re-enabled ... */}
            </div>
          </nav>
        </div>
      </motion.aside>
  );
};

export default AppSidebar;