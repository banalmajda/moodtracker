import Container from "../layout/Container.jsx";
import { Card, ContentCard, FooterCard, HeaderCard } from "../ui/Card.jsx";
import IconCheckmark from "../icons/IconCheckmark.jsx";
import IconChart from "../icons/IconChart.jsx";
import IconGlass from "../icons/IconGlass.jsx";
import IconPadlock from "../icons/IconPadlock.jsx";
import IconReason from "../icons/IconReason.jsx";

export default function Reason() {
  return (
    <Container>
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-[#1D493C]">
          4 Reasons To Choose Us
        </h1>
      </div>

      {/* Upgraded Responsive Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {/* Card 1: Intuitive Interface */}
        <Card>
          <HeaderCard>
            <IconReason>
              <IconCheckmark />
            </IconReason>
          </HeaderCard>
          <ContentCard>
            <h3>Intuitive Interface</h3>
          </ContentCard>
          <FooterCard>
            This feature highlights a user-friendly and easy-to-navigate design,
            ensuring that users can effortlessly interact with the platform
            without a steep learning curve.
          </FooterCard>
        </Card>

        {/* Card 2: In-depth Data Analysis */}
        <Card>
          <HeaderCard>
            <IconReason>
              <IconChart />
            </IconReason>
          </HeaderCard>

          <ContentCard>
            <h3>In-depth Data Analysis</h3>
          </ContentCard>

          <FooterCard>
            This point refers to the platform's capability to provide detailed
            and thorough insights by analyzing user data, helping individuals
            understand their emotional patterns and behaviors more deeply.
          </FooterCard>
        </Card>

        {/* Card 3: Trigger Identification */}
        <Card>
          <HeaderCard>
            <IconReason>
              <IconGlass />
            </IconReason>
          </HeaderCard>
          <ContentCard>
            <h3>Trigger Identification</h3>
          </ContentCard>

          <FooterCard>
            This advantage focuses on the platform's ability to help users
            pinpoint and understand the specific events, situations, or emotions
            that act as triggers for their emotional responses.
          </FooterCard>
        </Card>

        {/* Card 4: Guaranteed Mental Privacy */}
        <Card>
          <HeaderCard>
            <IconReason>
              <IconPadlock />
            </IconReason>
          </HeaderCard>
          <ContentCard>
            <h3>Guaranteed Mental Privacy</h3>
          </ContentCard>

          <FooterCard>
            This feature emphasizes the platform's commitment to protecting user
            data and ensuring the confidentiality of their personal and
            emotional information, building trust and a secure environment.
          </FooterCard>
        </Card>
      </div>
    </Container>
  );
}
