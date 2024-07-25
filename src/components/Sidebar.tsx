import { BotMessageSquare, PencilLine, SearchIcon } from "lucide-react";
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
      icon: BotMessageSquare,
    },
    {
      url: "/view-chatbots",
      name: {
        top: "Edit",
        bottom: "Chatbots",
      },
      icon: PencilLine,
    },
    {
      url: "/review-sessions",
      name: {
        top: "View",
        bottom: "Sessions",
      },
      icon: SearchIcon,
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
                bg-[#2991EE]
              "
              >
                <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                <div className="hidden md:inline">
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
