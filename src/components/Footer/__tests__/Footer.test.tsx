import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should display the current year in copyright", () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      getByText(`© ${currentYear} ACM San Antonio Professional Chapter`),
    ).toBeInTheDocument();
  });

  it("should display 501(c)(3) status", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("A 501(c)(3) Non-Profit Organization")).toBeInTheDocument();
  });

  it("should have a link to the official ACM website", () => {
    const { getByText } = render(<Footer />);
    const link = getByText("Official ACM Website");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.acm.org/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should have an email contact link", () => {
    const { getByText } = render(<Footer />);
    const emailLink = getByText("team@acmsa.org");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:team@acmsa.org");
  });

  it("should display version information", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Version:/)).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    const { getByRole, getByLabelText } = render(<Footer />);

    // Check footer has aria-label
    const footer = getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-label", "Site footer");

    // Check links have aria-labels
    expect(getByLabelText("Visit official ACM website (opens in new tab)")).toBeInTheDocument();
    expect(getByLabelText("Send email to ACM San Antonio")).toBeInTheDocument();

    // Check version has aria-label
    expect(getByLabelText("Website version")).toBeInTheDocument();
  });
});

