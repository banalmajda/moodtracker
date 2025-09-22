import Container from "../layout/Container.jsx";
import { Card, ContentCard, FooterCard, HeaderCard } from "../ui/Card.jsx";
import IconReason from "../icons/IconReason.jsx";

export default function Reason() {
  return (
    <Container>
      <div>
        <h1 className="text-4xl text-center font-bold text-[#1D493C]">
          4 Reasons To Choose Us
        </h1>
      </div>

      <div className=" flex  justify-between items-center my-10">
        <Card>
          <HeaderCard>
            <IconReason>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                >
                  <g
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M6.8 3a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M3.3 5.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                    <path d="M.8 14.5c0-3.322 2.67-6.5 6-6.5s6 3.178 6 6.5v2a.5.5 0 0 1-1 0v-2c0-2.873-2.32-5.5-5-5.5s-5 2.627-5 5.5v2a.5.5 0 0 1-1 0zM18.154 3.563a.5.5 0 0 1 .194.68l-2.778 5a.5.5 0 0 1-.874-.486l2.778-5a.5.5 0 0 1 .68-.194" />
                    <path d="M11.965 6.465a.5.5 0 0 1 .703-.078l2.778 2.223a.5.5 0 1 1-.625.78l-2.778-2.222a.5.5 0 0 1-.078-.703" />
                  </g>
                </svg>
              </div>
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

        <Card>
          <HeaderCard>
            <IconReason>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M5 11h3v5H5zm-4 3h3v2H1zm12-2h3v4h-3zM9 9h3v7H9zM5 0a5 5 0 1 0 .001 10.001A5 5 0 0 0 5 0m0 9a4 4 0 0 1 0-8v4h4a4 4 0 0 1-4 4"
                  />
                </svg>
              </div>
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

        <Card>
          <HeaderCard>
            <IconReason>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <g fill="currentColor">
                    <path d="M18.748 12.816c-1.74.067-3.313.688-4.154 1.53a1 1 0 1 1-1.414-1.415c1.297-1.297 3.409-2.033 5.49-2.114c2.095-.081 4.382.492 5.984 2.094a1 1 0 0 1-1.415 1.414c-1.09-1.091-2.764-1.577-4.491-1.51" />
                    <path
                      fill-rule="evenodd"
                      d="M28.936 27.384A12.95 12.95 0 0 0 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.195 0 6.12-1.152 8.384-3.064L27 31.144l7.514 7.514l4.144-4.144L31.144 27zM19 29c5.523 0 10-4.477 10-10S24.523 9 19 9S9 13.477 9 19s4.477 10 10 10"
                      clip-rule="evenodd"
                    />
                    <path d="m35.928 40.072l4.144-4.144l1.356 1.356c.763.763.763 2 0 2.762l-1.382 1.382c-.763.763-2 .763-2.762 0z" />
                  </g>
                </svg>
              </div>
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

        <Card>
          <HeaderCard>
            <IconReason>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M402.6 164.6c0-78.92-65.7-146.47-146.6-146.47c-81.1 0-146.6 65.49-146.6 146.47v72.3H159v-69.1c0-53.7 43.4-97.26 97-97.26c53.5 0 97 41.66 97 94.06zm-315.7 91C72.2 278.4 64 304.7 64 332.4c0 88.3 85 161.5 192 161.5s192-73.2 192-161.5c0-27.7-8.3-54-22.9-76.8zm168.8 23.9c22.3 0 40.9 18 40.9 40.3c0 16.8-10.6 31.2-25.1 37.3l32.7 98.2h-96.4l32.1-98.2c-14.5-6.1-24.5-20.6-24.5-37.3c0-22.3 18-40.3 40.3-40.3"
                  />
                </svg>
              </div>
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
