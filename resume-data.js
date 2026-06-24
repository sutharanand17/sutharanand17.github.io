const resumeData = {
    basics: {
        name: "Anand Suthar",
        title: "Staff Software Engineer / Tech Lead",
        location: "Hyderabad, India",
        summary: "Backend infrastructure engineer with 9+ years building distributed systems and enterprise platforms at Google (Tech Lead) and Splunk (Staff Engineer). Architected large-scale data pipelines that cut runtime by 80%, and drove engineering best practices across 18 technical designs. Built LLM-powered retrieval and analysis tools for CI/CD pipelines with MCP integration."
    },
    skills: [
        "Distributed Systems",
        "Back-end Infrastructure",
        "System Architecture",
        "Technical Leadership",
        "Data Pipelines",
        "Python",
        "Java",
        "TypeScript",
        "LLMs & MCP",
        "Enterprise Platforms"
    ],
    experience: [
        {
            company: "CISCO (Splunk)",
            role: "Staff Software Engineer",
            duration: "Apr 2025 - Present",
            highlights: [
                "Built an LLM-powered tool to automatically aggregate and analyze test failures from Git CI/CD pipelines with a chat-based MCP interface.",
                "Worked on Splunk ITSI Alerts and Episodes, implementing signal correlation and grouping of related alerts.",
                "Leading cross-functional initiatives to resolve complex issues and ensure product readiness."
            ]
        },
        {
            company: "Google",
            role: "Full Stack Developer (Tech Lead)",
            duration: "Aug 2021 - Apr 2025",
            highlights: [
                "Led a team of eight engineers, fostering a collaborative environment to maintain systems and deliver valuable enhancements.",
                "Enhanced data pipeline performance, achieving 80% runtime reduction through systematic optimization.",
                "Built the Case Management System: a unified orchestration layer for end-to-end management of enterprise legal matters.",
                "Authored 18 comprehensive technical designs and system improvement proposals."
            ]
        },
        {
            company: "LeadSquared",
            role: "Senior Software Engineer",
            duration: "May 2021 - Aug 2021",
            highlights: ["Diagnosed and debugged intricate system issues, optimizing performance and user experience."]
        },
        {
            company: "Nagarro",
            role: "Senior Engineer",
            duration: "Jun 2019 - Apr 2021",
            highlights: ["Key player in research-based tasks involving version upgrades and data purging.", "Won a client-organized hackathon for problem-solving skills."]
        },
        {
            company: "Pratham Software",
            role: "Software Engineer",
            duration: "Aug 2016 - May 2019",
            highlights: ["Architected and implemented robust business services and data access layers for scalable solutions.", "Enhanced system performance through database query tuning, resulting in 20% reduction in load times."]
        }
    ],
    projects: [
        {
            name: "LLM-Powered CI/CD Failure Analyzer",
            context: "Splunk",
            description: "Automated aggregation and analysis of test failures with dashboards. Integrated chat-based LLM interface via MCP.",
            tech: ["Python", "MCP", "VS Code Extension API", "LLM"]
        },
        {
            name: "Data Pipeline Optimization",
            context: "Google",
            description: "Re-architected enterprise data pipelines that reduced runtime by 80% through systematic bottleneck analysis and parallelization.",
            tech: ["Java", "TypeScript", "Data Pipelines", "SQL"]
        },
        {
            name: "Case Management System",
            context: "Google",
            description: "A unified orchestration layer for 1p/3p tools in the ELM ecosystem with full GAR accessibility compliance.",
            tech: ["Java", "TypeScript", "Sass", "Material"]
        }
    ],
    education: {
        degree: "B.E. in Production & Industrial Engineering",
        institution: "M.B.M. Engineering College",
        duration: "2012 - 2016"
    }
};

export default resumeData;
