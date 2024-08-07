import { Bot, ChartNoAxesGantt, Telescope } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const sideBarMenu = [
    {
      url: "/create-chatbot",
      name: {
        top: "Create",
        bottom: "Chatbots",
      },
      icon: Bot,
    },
    {
      url: "/view-chatbots",
      name: {
        top: "Manage",
        bottom: "Chatbots",
      },
      icon: ChartNoAxesGantt,
    },
    {
      url: "/review-sessions",
      name: {
        top: "Manage",
        bottom: "Sessions",
      },
      icon: Telescope,
    },
  ];

  return (
    <div className="bg-white text-white p-5">
      <ul className="gap-5 flex lg:flex-col">
        {sideBarMenu.map((menu, index) => {
          const Icon = menu.icon;
          return (
            <li key={index} className="flex-1">
              <Link
                href={menu.url}
                className="
                hover:opacity-90
                flex
                flex-col
                text-center
                lg:text-left
                lg:flex-row
                items-center
                gap-2
                p-5
                rounded-md
                bg-primary
              "
              >
                <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                <div className="hidden sm:inline cursor-pointer">
                  <p className="text-xl">{menu.name.top}</p>
                  <p className="text-sm font-extralight">{menu.name.bottom}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
