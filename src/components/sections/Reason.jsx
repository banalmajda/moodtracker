// src/components/Reason.jsx (atau lokasi komponen Reason Anda)

import React, { useState } from "react"; // Impor useState
import Container from "../layout/Container.jsx";
import { Card, ContentCard, FooterCard, HeaderCard } from "../ui/Card.jsx";
import IconCheckmark from "../icons/IconCheckmark.jsx";
import IconChart from "../icons/IconChart.jsx";
import IconGlass from "../icons/IconGlass.jsx";
import IconPadlock from "../icons/IconPadlock.jsx";
import IconReason from "../icons/IconReason.jsx";

export default function Reason() {
  // State untuk menampung indeks kartu yang sedang aktif. Default-nya null (tidak ada yang aktif).
  const [activeIndex, setActiveIndex] = useState(null);

  // Data kartu dalam array agar mudah di-looping
  const cardData = [
    {
      icon: <IconCheckmark />,
      title: "Intuitive Interface",
      description:
        "This feature highlights a user-friendly and easy-to-navigate design, ensuring that users can effortlessly interact with the platform without a steep learning curve.",
    },
    {
      icon: <IconChart />,
      title: "In-depth Data Analysis",
      description:
        "This point refers to the platform's capability to provide detailed and thorough insights by analyzing user data, helping individuals understand their emotional patterns and behaviors more deeply.",
    },
    {
      icon: <IconGlass />,
      title: "Trigger Identification",
      description:
        "This advantage focuses on the platform's ability to help users pinpoint and understand the specific events, situations, or emotions that act as triggers for their emotional responses.",
    },
    {
      icon: <IconPadlock />,
      title: "Guaranteed Mental Privacy",
      description:
        "This feature emphasizes the platform's commitment to protecting user data and ensuring the confidentiality of their personal and emotional information, building trust and a secure environment.",
    },
  ];

  // Handler untuk mengklik kartu
  const handleCardClick = (index) => {
    // Jika kartu yang diklik sudah aktif, matikan (set ke null).
    // Jika tidak, set kartu baru sebagai aktif.
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Container>
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-[#1D493C]">
          4 Reasons To Choose Us
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {cardData.map((data, index) => (
          <Card
            key={index}
            // Meneruskan state: kartu ini aktif jika indeksnya sama dengan activeIndex
            isActive={index === activeIndex}
            // Meneruskan handler klik
            onClick={() => handleCardClick(index)}
          >
            <HeaderCard>
              {/* Meneruskan state isActive ke komponen IconReason */}
              <IconReason isActive={index === activeIndex}>
                {data.icon}
              </IconReason>
            </HeaderCard>

            {/* Meneruskan state isActive ke komponen ContentCard */}
            <ContentCard isActive={index === activeIndex}>
              <h3>{data.title}</h3>
            </ContentCard>

            <FooterCard isActive={index === activeIndex}>
              {data.description}
            </FooterCard>
          </Card>
        ))}
      </div>
    </Container>
  );
}
