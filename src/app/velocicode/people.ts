// ── Types ─────────────────────────────────────────────────────────────────

export interface JudgeLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface Judge {
  name: string;
  title: string;
  photo?: string;
  orgBadge?: { src: string; alt: string };
  links?: JudgeLink[];
}

export interface WinnerProject {
  title: string;
  team: string;
  rankLabel: string;
  rankNum: 1 | 2 | 3;
}

export interface WinnerCategory {
  icon: string;
  eyebrow: string;
  title: string;
  projects: WinnerProject[];
  isOverall?: boolean;
  ribbon?: string;
}

export interface OrgLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface OrgDirector {
  name: string;
  role: string;
  photo?: string;
  links?: OrgLink[];
}

export interface OrgMember {
  name: string;
  role: string;
  photo?: string;
  links?: OrgLink[];
}

// ── Data ──────────────────────────────────────────────────────────────────

// Judges — add each judge as they confirm; orgBadge.src points to /public/*.
export const JUDGES: Judge[] = [
  {
    name: "Christopher Salas",
    title: "Founder & CEO, Malayla Interactive",
    photo: "christopher-salas.jpeg",
    links: [
      {
        label: "web",
        href: "https://www.malaylainteractive.com/",
        ariaLabel: "Website",
      },
      {
        label: "ig",
        href: "https://www.instagram.com/malaylainteractive/",
        ariaLabel: "Instagram",
      },
    ],
  },
  {
    name: "Cameron Hall",
    title: "Software Engineer",
    // photo: "/cameron-hall.jpeg",
  },
  {
    name: "Gene Tigner",
    title: "Software Engineer",
    photo: "gene-tigner.jpg",
    orgBadge: { src: "/acm-logo.svg", alt: "ACM San Antonio" },
  },
  {
    name: "Jonathan Perry",
    title: "Software Developer, Reactive",
    photo: "jonathan-perry.jpeg",
    orgBadge: { src: "/unreal-engine-sa.png", alt: "Unreal Engine San Antio" },
  },
  {
    name: "Al Dungo",
    title: "Doctoral of IT Student, Capella University/Department of Air Force",
    photo: "al-dungo.jpg",
    orgBadge: { src: "/devsa.png", alt: "DEVSA" },
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/al-dungo-543688113",
        ariaLabel: "Linkedin",
      },
    ],
  },
];

// Winners — must be ordered [Theme, Overall, Crowd] for the CSS layout to
// work correctly (center card is elevated, first rotates left, last right).
// Empty = "pending" message; populate after the showcase.
export const WINNERS: WinnerCategory[] = [];
export const WINNERS01: WinnerCategory[] = [
  {
    icon: "vc-compass",
    eyebrow: "stayed on brief",
    title: "Best Use of Theme",
    projects: [
      {
        title: "Bone Deep",
        team: "Team Marrow",
        rankLabel: "Winner",
        rankNum: 1,
      },
    ],
  },
  {
    icon: "vc-medal",
    eyebrow: "the big one",
    title: "Best Overall",
    isOverall: true,
    ribbon: "★ The Headline Award ★",
    projects: [
      {
        title: "Fossil Run",
        team: "Team Sedimentary Rockers",
        rankLabel: "Winner",
        rankNum: 1,
      },
      {
        title: "Nightshift Diner",
        team: "Team Late Shift",
        rankLabel: "Runner-up",
        rankNum: 2,
      },
    ],
  },
  {
    icon: "vc-megaphone",
    eyebrow: "voted by the room",
    title: "Crowd Favorite",
    projects: [
      { title: "Sedimentary", team: "Casey Lin", rankLabel: "1st", rankNum: 1 },
      {
        title: "Pixel Paleo",
        team: "Jordan Reyes",
        rankLabel: "2nd",
        rankNum: 2,
      },
      {
        title: "Last Dino Standing",
        team: "Marcus Webb",
        rankLabel: "3rd",
        rankNum: 3,
      },
    ],
  },
];

// Organizers — director renders as a spotlight above the grid.
// Set director to null and leave members empty to hide the whole section.
export const ORG_DIRECTOR: OrgDirector | null = {
  name: "Zaquariah Hollnad",
  role: "Director",
  photo: "zaquariah-holland.png",
  links: [
    {
      label: "in",
      href: "https://www.linkedin.com/in/zaquariah-holland/",
      ariaLabel: "LinkedIn",
    },
    { label: "port", href: "https://zaquariah.dev/", ariaLabel: "Website" },
  ],
};

export const ORG_MEMBERS: OrgMember[] = [
  {
    name: "Gene Tigner",
    role: "Organizer",
    photo: "gene-tigner.jpg",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/jonathan-t-a460a6103/",
        ariaLabel: "LinkedIn",
      },
    ],
  },
  {
    name: "Ansley Partosa",
    role: "Organizer",
    photo: "ansley-partosa.png",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/ansley-partosa/",
        ariaLabel: "LinkedIn",
      },
      {
        label: "ig",
        href: "https://www.instagram.com/ansleypartosa/",
        ariaLabel: "Instagram",
      },
    ],
  },
  {
    name: "Mark Robinson",
    role: "Organizer",
    photo: "mark-robinson.jpg",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/mark-robinson-0b38975b/",
        ariaLabel: "LinkedIn",
      },
    ],
  },
  {
    name: "James Nicholson",
    role: "Organizer",
    photo: "james-nicholson.png",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/jamesnicholsonwriter/",
        ariaLabel: "LinkedIn",
      },
      {
        label: "port",
        href: "https://www.jnicholsondesign.com/",
        ariaLabel: "Portfolio",
      },
    ],
  },
  {
    name: "Sly",
    role: "Organizer",
  },
  {
    name: "Rick Canfield",
    role: "Unreal Engine SA",
    photo: "rick-canfield.jpeg",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/rickcanfield/",
        ariaLabel: "LinkedIn",
      },
      {
        label: "port",
        href: "https://thenativecreation.com/",
        ariaLabel: "Portfolio",
      },
    ],
  },
  {
    name: "Jonathan Perry",
    role: "Unreal Engine SA",
    photo: "jonathan-perry.jpeg",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/jonathanperry/",
        ariaLabel: "LinkedIn",
      },
      { label: "port", href: "https://ractive.com/", ariaLabel: "Portfolio" },
    ],
  },
  {
    name: "Werner Mendizabal",
    role: "Godot Developer",
    photo: "werner-mendizabal.jpeg",
    links: [
      {
        label: "in",
        href: "https://www.linkedin.com/in/werner-mendizabal/",
        ariaLabel: "LinkedIn",
      },
      {
        label: "port",
        href: "https://github.com/nonameentername",
        ariaLabel: "Portfolio",
      },
    ],
  },
];
