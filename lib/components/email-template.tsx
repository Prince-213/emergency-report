import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Button
} from "@react-email/components";
import * as React from "react";
import { render } from "@react-email/render";
import { LuCheckCheck } from "react-icons/lu";

interface EmergencyResponseEmailProps {
  responseMessage: string;
  responseTime?: string;
}

export const EmergencyResponseEmail = ({
  responseMessage,
  responseTime = new Date().toLocaleString()
}: EmergencyResponseEmailProps) => (
  <Html>
    <Head />
    <Preview>Emergency response update</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <LuCheckCheck size={48} color="#4CAF50" />
          <Text style={headerTitle}>EMERGENCY RESPONSE UPDATE</Text>
        </Section>

        <Section style={content}>
          <Text style={paragraph}>
            The reported emergency is currently being handled by our response
            team.
          </Text>

          <Section style={messageBox}>
            <Text style={messageTitle}>Response Message:</Text>
            <Text style={messageText}>{responseMessage}</Text>
            <Text style={timeText}>Response time: {responseTime}</Text>
          </Section>

          <Text style={paragraph}>
            If you need to provide additional information, please reply to this
            message.
          </Text>

          <Button style={button} href="mailto:emergency@school.edu">
            REPLY TO RESPONSE TEAM
          </Button>
        </Section>

        <Text style={footer}>
          School Emergency Response System • {new Date().getFullYear()}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmergencyResponseEmail;

export const renderEmergencyResponseEmail = async (
  props: EmergencyResponseEmailProps
) => await render(<EmergencyResponseEmail {...props} />);

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  color: "#333333",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0 30px"
};

const header = {
  textAlign: "center" as const,
  marginBottom: "32px"
};

const headerTitle = {
  color: "#4CAF50",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "20px 0 0 0"
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 24px 0"
};

const messageBox = {
  backgroundColor: "#E8F5E9",
  padding: "20px",
  borderRadius: "8px",
  margin: "0 0 24px 0",
  borderLeft: "4px solid #4CAF50"
};

const messageTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 12px 0",
  color: "#2E7D32"
};

const messageText = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 12px 0"
};

const timeText = {
  fontSize: "14px",
  color: "#666666",
  margin: "0"
};

const button = {
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  fontSize: "16px",
  padding: "12px 24px",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: "bold",
  display: "block",
  width: "fit-content",
  margin: "0 auto"
};

const footer = {
  color: "#777777",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "32px"
};
