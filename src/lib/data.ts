export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    image: string;
    author: string;
    publishedAt: string;
}

export const categories = [
    { name: "Home", slug: "" },
    { name: "Technology", slug: "technology" },
    { name: "Business", slug: "business" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Health", slug: "health" },
    { name: "Science", slug: "science" },
];

export const articles: Article[] = [
    {
        id: "1",
        title: "AI Revolution: How Machine Learning Is Transforming Every Industry",
        description:
            "From healthcare to finance, artificial intelligence is reshaping the way businesses operate and deliver value to customers worldwide.",
        content: `Artificial intelligence has moved far beyond the realm of science fiction and into the everyday operations of businesses across the globe. Companies are leveraging machine learning algorithms to automate processes, predict consumer behavior, and create entirely new products and services.\n\nIn healthcare, AI-powered diagnostic tools are helping doctors identify diseases earlier and more accurately than ever before. Financial institutions are using sophisticated models to detect fraud in real-time, saving billions of dollars annually.\n\nThe manufacturing sector has embraced AI-driven robotics, increasing production efficiency while reducing costs. Even creative industries are feeling the impact, with AI tools assisting in content creation, music composition, and visual design.\n\nExperts predict that the AI market will continue to grow exponentially, with global spending on AI technologies expected to surpass $500 billion by 2027. However, this rapid adoption also raises important questions about workforce displacement, data privacy, and ethical use of these powerful technologies.`,
        category: "technology",
        image: "/placeholder-tech-1.jpg",
        author: "Sarah Chen",
        publishedAt: "2026-02-15",
    },
    {
        id: "2",
        title: "Global Markets Rally as Central Banks Signal Rate Cuts",
        description:
            "Stock markets worldwide surge following coordinated statements from major central banks hinting at monetary policy easing.",
        content: `Global stock markets experienced a significant rally today as central banks across multiple continents signaled a shift toward more accommodative monetary policies. The coordinated messaging suggests that the era of aggressive interest rate hikes may be coming to an end.\n\nThe S&P 500 jumped 2.3% in early trading, while European markets saw similar gains. Asian markets, which traded earlier in the day, also posted strong results with the Nikkei 225 climbing 1.8%.\n\nAnalysts attribute the positive sentiment to statements from the Federal Reserve, European Central Bank, and Bank of England, all of which indicated that inflation pressures are easing sufficiently to consider rate reductions in the coming months.\n\n"This is the signal investors have been waiting for," said Maria Rodriguez, chief economist at Global Investment Partners. "Lower rates mean cheaper borrowing costs for businesses and consumers, which should stimulate economic growth across the board."`,
        category: "business",
        image: "/placeholder-business-1.jpg",
        author: "Michael Torres",
        publishedAt: "2026-02-14",
    },
    {
        id: "3",
        title: "Historic Champions League Final Draws Record Viewership",
        description:
            "The UEFA Champions League final between Real Madrid and Manchester City attracted over 400 million viewers worldwide.",
        content: `In what many are calling the greatest Champions League final in history, Real Madrid and Manchester City delivered a spectacular match that captivated audiences around the world. The game, which ended 3-2 after extra time, drew an estimated 400 million viewers globally.\n\nThe match featured incredible individual performances, dramatic late goals, and the kind of tension that only the biggest stage in club football can provide. Real Madrid's comeback from two goals down in the second half will be talked about for generations.\n\nBroadcasting networks reported unprecedented engagement across all platforms, with social media interactions during the match breaking all previous records for a sporting event. Streaming platforms also noted a significant spike in viewership, reflecting the changing habits of sports fans.\n\nUEFA President expressed delight at the numbers, stating that the beautiful game continues to unite people across borders and cultures.`,
        category: "sports",
        image: "/placeholder-sports-1.jpg",
        author: "James O'Brien",
        publishedAt: "2026-02-13",
    },
    {
        id: "4",
        title: "Breakthrough Gene Therapy Shows Promise for Rare Diseases",
        description:
            "A new gene therapy approach has demonstrated remarkable results in clinical trials for treating previously untreatable genetic conditions.",
        content: `Scientists at the National Institutes of Health have announced groundbreaking results from a phase III clinical trial of a novel gene therapy designed to treat a range of rare genetic disorders. The therapy, which uses modified viral vectors to deliver corrective genes directly to affected cells, showed efficacy rates exceeding 85%.\n\nThe treatment targets a group of lysosomal storage disorders that affect approximately 1 in 7,000 newborns worldwide. Previously, patients with these conditions had limited treatment options and faced significantly reduced life expectancy.\n\n"These results represent a paradigm shift in how we approach genetic diseases," said Dr. Amanda Foster, lead researcher on the study. "We're essentially giving the body the instructions it needs to produce the missing enzymes on its own."\n\nThe FDA has granted the therapy breakthrough status, fast-tracking its review process. If approved, it could become available to patients within the next 18 months, offering hope to thousands of families affected by these devastating conditions.`,
        category: "health",
        image: "/placeholder-health-1.jpg",
        author: "Dr. Emily Watson",
        publishedAt: "2026-02-14",
    },
    {
        id: "5",
        title: "New Blockbuster Film Breaks Opening Weekend Records",
        description:
            "The latest installment in the beloved franchise earned over $350 million globally in its first weekend.",
        content: `The highly anticipated sequel has shattered box office records with a stunning $350 million global opening weekend, making it the biggest debut of the year and one of the top ten openings of all time.\n\nThe film, which brings together an ensemble cast of A-list stars, received overwhelmingly positive reviews from critics, with particular praise for its visual effects, storytelling, and emotional depth. Audience scores on major review platforms have been equally impressive.\n\nTheater chains reported sold-out screenings across multiple time slots, with many venues adding extra showings to meet demand. IMAX and premium format screens accounted for a significant portion of the revenue.\n\nThe studio has already confirmed plans for a follow-up, with production expected to begin later this year. Industry analysts predict the film could surpass $1 billion in worldwide gross within its first month of release.`,
        category: "entertainment",
        image: "/placeholder-entertainment-1.jpg",
        author: "Lisa Park",
        publishedAt: "2026-02-12",
    },
    {
        id: "6",
        title: "James Webb Telescope Discovers New Earth-Like Exoplanet",
        description:
            "NASA's James Webb Space Telescope has identified a potentially habitable exoplanet with atmospheric conditions similar to early Earth.",
        content: `NASA scientists have announced the discovery of a remarkable exoplanet located approximately 40 light-years from Earth that shows signs of having an atmosphere remarkably similar to that of early Earth. The planet, designated JWST-2026b, was identified using the James Webb Space Telescope's advanced infrared capabilities.\n\nThe exoplanet orbits within the habitable zone of its star, where temperatures could allow liquid water to exist on the surface. Spectroscopic analysis of the planet's atmosphere has revealed the presence of water vapor, carbon dioxide, and intriguingly, possible traces of methane.\n\n"This is one of the most exciting discoveries in exoplanet science to date," said Dr. Robert Chang, an astrophysicist at NASA's Goddard Space Flight Center. "The atmospheric composition we're seeing is consistent with conditions that could potentially support microbial life."\n\nFurther observations are planned over the coming months to confirm and refine these findings, with the scientific community eagerly awaiting additional data.`,
        category: "science",
        image: "/placeholder-science-1.jpg",
        author: "Dr. Robert Chang",
        publishedAt: "2026-02-15",
    },
    {
        id: "7",
        title: "Quantum Computing Milestone: First Error-Corrected Processor",
        description:
            "Tech giant unveils the first commercially viable quantum processor with built-in error correction, marking a new era in computing.",
        content: `In a landmark achievement for the quantum computing industry, researchers have successfully demonstrated the first quantum processor capable of performing error-corrected computations at scale. This breakthrough addresses one of the most significant challenges that has limited quantum computing's practical applications.\n\nThe new processor uses a novel architecture that integrates error correction directly into the hardware, reducing the number of physical qubits needed while maintaining computational accuracy. This approach makes quantum computing significantly more practical for real-world applications.\n\nPotential applications include drug discovery, where quantum simulations could dramatically accelerate the identification of promising compounds, and cryptography, where quantum algorithms could both break and create more secure encryption methods.\n\nIndustry analysts predict this breakthrough will accelerate the quantum computing market's growth, with commercial applications potentially arriving years ahead of previous estimates.`,
        category: "technology",
        image: "/placeholder-tech-2.jpg",
        author: "David Kim",
        publishedAt: "2026-02-13",
    },
    {
        id: "8",
        title: "Electric Vehicle Sales Surpass Combustion Cars in Europe",
        description:
            "For the first time in history, electric vehicle sales have overtaken traditional combustion engine cars across the European market.",
        content: `In a historic milestone for the automotive industry, electric vehicle sales in Europe have surpassed those of traditional internal combustion engine vehicles for the first time. The shift, which many analysts predicted wouldn't happen until 2028, reflects the accelerating pace of the green energy transition.\n\nData from the European Automobile Manufacturers' Association shows that EVs accounted for 52% of all new car registrations in January, up from 38% in the same period last year. The growth has been driven by a combination of stricter emissions regulations, expanding charging infrastructure, and increasingly competitive pricing.\n\nMajor automakers have responded by accelerating their electrification timelines, with several announcing plans to phase out combustion engine production entirely by 2030. The shift has also created significant employment opportunities in battery manufacturing and charging infrastructure development.\n\nHowever, challenges remain, including concerns about battery raw material sourcing, grid capacity, and the need for continued expansion of charging networks in rural areas.`,
        category: "business",
        image: "/placeholder-business-2.jpg",
        author: "Anna Bergström",
        publishedAt: "2026-02-12",
    },
    {
        id: "9",
        title: "Olympic Committee Announces New Sports for 2028 Games",
        description:
            "The IOC has confirmed the addition of three new sports to the 2028 Los Angeles Olympic program.",
        content: `The International Olympic Committee has officially confirmed the addition of three new sports to the 2028 Los Angeles Olympic Games program. The additions reflect the IOC's ongoing effort to attract younger audiences and keep the Games relevant in a rapidly changing sports landscape.\n\nThe new sports include flag football, squash, and cricket (T20 format), each selected after extensive review and consultation with international federations, athletes, and broadcasters.\n\nFlag football's inclusion comes with strong backing from the NFL, which sees the Olympics as an opportunity to grow American football's international footprint. Cricket's addition acknowledges the sport's massive global following, particularly in South Asia.\n\n"These additions will bring fresh energy to the Olympic program while honoring the traditions that make the Games special," said IOC President Thomas Bach. The decision has been met with enthusiasm from fans and athletes worldwide.`,
        category: "sports",
        image: "/placeholder-sports-2.jpg",
        author: "Marcus Williams",
        publishedAt: "2026-02-11",
    },
    {
        id: "10",
        title: "Revolutionary Weight Loss Drug Shows No Side Effects in Trials",
        description:
            "A new class of weight management medication has achieved significant results in clinical trials without the common side effects of existing treatments.",
        content: `A pharmaceutical company has released promising data from a large-scale clinical trial of a next-generation weight management drug that achieves comparable weight loss results to existing medications while virtually eliminating the gastrointestinal side effects that have limited their adoption.\n\nThe drug, which works through a novel mechanism targeting specific metabolic pathways, helped participants lose an average of 18% of their body weight over 52 weeks. Remarkably, less than 2% of participants reported nausea or other digestive issues, compared to rates exceeding 30% with current leading treatments.\n\n"This could be a game-changer for the millions of people struggling with obesity who have been unable to tolerate existing medications," said Dr. Jennifer Liu, an endocrinologist involved in the trial. "We're seeing the benefits without the trade-offs."\n\nThe company plans to submit the drug for regulatory approval in the second half of 2026, with potential market availability by early 2027.`,
        category: "health",
        image: "/placeholder-health-2.jpg",
        author: "Dr. Jennifer Liu",
        publishedAt: "2026-02-13",
    },
    {
        id: "11",
        title: "Streaming Wars Heat Up as New Platform Launches Globally",
        description:
            "A major tech company enters the streaming market with an ambitious content slate and competitive pricing.",
        content: `The streaming landscape has become even more crowded with the launch of a new platform backed by one of the world's largest technology companies. The service debuts with an impressive library of original content and a pricing strategy designed to undercut established competitors.\n\nThe platform launches with over 50 original series and films, including several high-profile projects from award-winning creators. The company has committed to spending $8 billion annually on content production, placing it among the top spenders in the industry.\n\nIndustry analysts note that the new entrant faces significant challenges in an increasingly saturated market where consumers are showing signs of subscription fatigue. However, the platform's integration with the company's existing ecosystem of products and services could provide a unique advantage.\n\n"The streaming market is mature, but there's always room for a player with deep pockets and a differentiated strategy," said media analyst Sandra Cho.`,
        category: "entertainment",
        image: "/placeholder-entertainment-2.jpg",
        author: "Sandra Cho",
        publishedAt: "2026-02-11",
    },
    {
        id: "12",
        title: "Deep Ocean Exploration Reveals New Species at Record Depths",
        description:
            "Marine biologists have discovered over 30 previously unknown species living in the deepest parts of the Pacific Ocean.",
        content: `A groundbreaking deep-sea expedition to the hadal zone of the Pacific Ocean has yielded the discovery of more than 30 previously unknown species, including several that challenge our understanding of life at extreme depths.\n\nThe expedition, conducted using advanced autonomous underwater vehicles equipped with high-definition cameras and collection tools, explored depths exceeding 10,000 meters. Among the discoveries are bioluminescent fish with unique adaptations, transparent crustaceans, and microorganisms that thrive in conditions previously thought inhospitable to life.\n\n"Each of these discoveries tells us something new about the resilience and adaptability of life on Earth," said marine biologist Dr. Patricia Alvarez. "The deep ocean remains our planet's last great frontier of exploration."\n\nThe findings have implications beyond marine biology, with several of the newly discovered organisms producing compounds that could have pharmaceutical applications. The research team is already planning follow-up expeditions to study these ecosystems in greater detail.`,
        category: "science",
        image: "/placeholder-science-2.jpg",
        author: "Dr. Patricia Alvarez",
        publishedAt: "2026-02-12",
    },
    {
        id: "13",
        title: "5G Networks Enable Smart City Infrastructure Worldwide",
        description:
            "Cities around the globe are leveraging 5G connectivity to implement intelligent transportation, energy, and public safety systems.",
        content: `The rollout of 5G networks has reached a tipping point, enabling cities worldwide to implement smart infrastructure systems that promise to transform urban living. From intelligent traffic management to real-time environmental monitoring, the applications of high-speed, low-latency connectivity are becoming increasingly tangible.\n\nSeveral major cities have launched comprehensive smart city programs that leverage 5G to connect millions of sensors, cameras, and devices across their metropolitan areas. These systems are already showing results, with participating cities reporting reductions in traffic congestion, energy consumption, and emergency response times.\n\nThe economic impact is also significant, with smart city investments creating new jobs in technology, engineering, and data science. Industry estimates suggest that the global smart city market will reach $2.5 trillion by 2030.\n\nHowever, the expansion raises important questions about data privacy, cybersecurity, and the digital divide between communities with and without access to these technologies.`,
        category: "technology",
        image: "/placeholder-tech-3.jpg",
        author: "Alex Rivera",
        publishedAt: "2026-02-11",
    },
    {
        id: "14",
        title: "Global Supply Chain Restructuring Accelerates",
        description:
            "Companies worldwide are diversifying their supply chains, shifting production to multiple regions to reduce risk.",
        content: `The trend toward supply chain diversification has accelerated dramatically, with major corporations announcing significant investments in reshoring and nearshoring manufacturing operations. The shift, driven by lessons learned from recent disruptions, is reshaping global trade patterns.\n\nSoutheast Asian nations, Mexico, and Eastern European countries are emerging as primary beneficiaries of this restructuring, attracting billions in new manufacturing investment. Companies are prioritizing resilience over pure cost optimization, building redundancy into their supply networks.\n\n"The era of single-source, cost-optimized supply chains is over," said logistics expert Thomas Weber. "Companies are now willing to pay a premium for security and flexibility."\n\nThe restructuring is also driving innovation in supply chain technology, with companies investing heavily in AI-powered demand forecasting, blockchain-based tracking systems, and automated warehouse solutions.`,
        category: "business",
        image: "/placeholder-business-3.jpg",
        author: "Thomas Weber",
        publishedAt: "2026-02-10",
    },
    {
        id: "15",
        title: "Tennis Star Announces Comeback After Career-Threatening Injury",
        description:
            "Former world number one confirms return to competitive tennis following an 18-month recovery from a severe knee injury.",
        content: `In an emotional press conference, the former world number one tennis player announced their return to competitive tennis after an 18-month absence due to a career-threatening knee injury. The announcement has sent waves of excitement through the tennis world.\n\nThe player sustained the injury during a Grand Slam semifinal, requiring extensive surgery followed by a grueling rehabilitation process. Medical experts initially gave only a 30% chance of a return to elite-level competition.\n\n"There were dark days when I questioned whether I'd ever play again," the player said. "But the support of my team, family, and fans kept me going. I'm not coming back just to participate—I'm coming back to compete for titles."\n\nThe comeback is scheduled to begin at a Masters 1000 event next month, with the player targeting a return to the top 10 by the end of the year. The tennis community has widely welcomed the news.`,
        category: "sports",
        image: "/placeholder-sports-3.jpg",
        author: "Elena Voronova",
        publishedAt: "2026-02-10",
    },
    {
        id: "16",
        title: "Mental Health Apps See Surge in Adoption Among Young Adults",
        description:
            "Digital mental health platforms report record downloads as younger generations embrace technology-assisted therapy.",
        content: `Mental health applications have experienced unprecedented growth, with leading platforms reporting a 200% increase in downloads among users aged 18-30 over the past year. The trend reflects a broader shift in how younger generations approach mental health care.\n\nThese apps offer a range of services, from AI-powered cognitive behavioral therapy exercises to connections with licensed therapists via video chat. Many provide free basic features with premium subscriptions for more comprehensive care.\n\nMental health professionals have largely welcomed the trend, noting that apps can serve as an accessible entry point for people who might not otherwise seek help. However, experts caution that digital tools should complement, not replace, professional care for serious conditions.\n\n"Technology is breaking down barriers to mental health support," said psychologist Dr. Rachel Kim. "But it's important that these platforms maintain high clinical standards and know when to refer users to in-person care."`,
        category: "health",
        image: "/placeholder-health-3.jpg",
        author: "Dr. Rachel Kim",
        publishedAt: "2026-02-11",
    },
    {
        id: "17",
        title: "Award Season Surprises: Indie Films Dominate Nominations",
        description:
            "This year's major award nominations have been dominated by independent films, signaling a shift in industry recognition.",
        content: `The latest round of major film award nominations has delivered surprising results, with independent and arthouse films claiming a dominant share of the major categories. The trend marks a notable shift from recent years when big-budget productions held sway.\n\nSeveral low-budget productions, made for a fraction of the cost of typical Hollywood blockbusters, have emerged as frontrunners in categories including Best Picture, Best Director, and Best Screenplay. Critics have praised the nominees for their bold storytelling, diverse perspectives, and artistic ambition.\n\nIndustry observers attribute the shift to several factors, including the democratization of filmmaking technology, the influence of streaming platforms in distributing independent content, and a growing appetite among audiences for authentic, original stories.\n\n"This is a golden age for independent cinema," said film critic Anthony Martinez. "The barriers to creating and distributing quality films have never been lower."`,
        category: "entertainment",
        image: "/placeholder-entertainment-3.jpg",
        author: "Anthony Martinez",
        publishedAt: "2026-02-10",
    },
    {
        id: "18",
        title: "CRISPR Technology Used to Restore Coral Reef Ecosystems",
        description:
            "Scientists have successfully used gene editing to create heat-resistant coral that can survive rising ocean temperatures.",
        content: `In a breakthrough that could help save the world's endangered coral reefs, marine scientists have successfully used CRISPR gene editing technology to create coral varieties that are significantly more resistant to the elevated ocean temperatures caused by climate change.\n\nThe modified coral, which has been tested in controlled ocean environments for over two years, shows a 40% higher survival rate during heat stress events compared to natural coral. Importantly, the edited coral maintains its ability to support the diverse ecosystems that depend on reef habitats.\n\n"Coral reefs support 25% of all marine life, yet we're losing them at an alarming rate," said Dr. Maria Santos, lead researcher on the project. "This technology gives us a powerful tool to help reefs adapt to changing conditions while we work on addressing the root causes of climate change."\n\nThe team plans to begin larger-scale deployments in partnership with conservation organizations in the Great Barrier Reef and Caribbean reef systems later this year.`,
        category: "science",
        image: "/placeholder-science-3.jpg",
        author: "Dr. Maria Santos",
        publishedAt: "2026-02-14",
    },
    {
        id: "19",
        title: "Cybersecurity Threats Evolve with AI-Powered Attacks",
        description:
            "Security experts warn of a new generation of cyberattacks that leverage artificial intelligence to bypass traditional defenses.",
        content: `Cybersecurity professionals are sounding the alarm about a dramatic evolution in cyber threats, as malicious actors increasingly deploy AI-powered tools to conduct more sophisticated and harder-to-detect attacks. The trend represents a fundamental shift in the threat landscape.\n\nThese new attacks use machine learning algorithms to adapt in real-time, evading traditional security measures that rely on known attack signatures. AI-powered phishing campaigns can now generate highly personalized messages that are virtually indistinguishable from legitimate communications.\n\n"We're entering an era where cyberattacks can learn and evolve faster than human defenders can respond," said cybersecurity expert Mark Thompson. "The only effective defense against AI-powered attacks is AI-powered defense."\n\nOrganizations are responding by investing heavily in AI-driven security solutions, including behavioral analysis systems that can detect anomalies in network traffic and automated incident response platforms that can contain threats in milliseconds.`,
        category: "technology",
        image: "/placeholder-tech-4.jpg",
        author: "Mark Thompson",
        publishedAt: "2026-02-10",
    },
    {
        id: "20",
        title: "Remote Work Revolution: Companies Embrace Permanent Flexibility",
        description:
            "Major corporations announce permanent hybrid and remote work policies, reshaping the future of office culture.",
        content: `A growing number of Fortune 500 companies are making their remote and hybrid work arrangements permanent, signaling a fundamental shift in how corporate America approaches work. The trend, which accelerated during the pandemic, has now become a structural change in the labor market.\n\nRecent surveys show that 73% of large companies now offer permanent hybrid options, up from 45% two years ago. Several major tech firms and financial institutions have gone further, allowing fully remote work for most positions.\n\nThe shift is having profound effects on commercial real estate, transportation, and urban planning. City centers that once bustled with office workers are reimagining their spaces, while suburban and rural areas are experiencing new growth as workers relocate.\n\n"The five-day office week is becoming a relic of the past," said workplace strategist Diana Palmer. "Companies that resist this change risk losing top talent to more flexible competitors."`,
        category: "business",
        image: "/placeholder-business-4.jpg",
        author: "Diana Palmer",
        publishedAt: "2026-02-09",
    },
    {
        id: "21",
        title: "Esports Tournament Breaks Prize Pool Record",
        description:
            "The world's largest esports tournament offers a record $40 million prize pool, attracting top teams from around the globe.",
        content: `The annual world championship for one of the most popular competitive video games has shattered records with a $40 million prize pool, making it the richest esports event in history. The tournament, which runs over two weeks, features 24 teams from six continents.\n\nThe massive prize pool reflects the continued growth of the esports industry, which now generates over $2 billion in annual revenue globally. Sponsors from traditional industries including automotive, finance, and telecommunications have poured money into the space.\n\nViewership numbers are expected to rival those of traditional sports events, with organizers projecting peak concurrent viewership of over 50 million across streaming platforms worldwide.\n\n"Esports has firmly established itself as mainstream entertainment," said tournament organizer Chris Park. "The production values, athletic competition, and fan engagement are on par with anything in traditional sports."`,
        category: "sports",
        image: "/placeholder-sports-4.jpg",
        author: "Chris Park",
        publishedAt: "2026-02-09",
    },
    {
        id: "22",
        title: "New Study Links Gut Microbiome to Cognitive Function",
        description:
            "Researchers discover a direct connection between gut bacteria diversity and brain health, opening new avenues for treating neurological conditions.",
        content: `A landmark study published in Nature has revealed a direct mechanistic link between the diversity of gut microbiome bacteria and cognitive function in humans. The research, conducted over five years with 10,000 participants, provides the strongest evidence yet for the gut-brain connection.\n\nParticipants with higher gut bacteria diversity consistently scored better on cognitive tests and showed lower rates of cognitive decline over the study period. The researchers identified specific bacterial strains that produce neurotransmitter precursors directly utilized by the brain.\n\n"We've moved beyond correlation to causation," said lead researcher Dr. Yuki Tanaka. "We can now show exactly how certain gut bacteria influence brain function at the molecular level."\n\nThe findings open new possibilities for treating and preventing neurological conditions through dietary interventions and probiotic therapies. Several pharmaceutical companies have already begun developing targeted probiotic treatments based on the study's findings.`,
        category: "health",
        image: "/placeholder-health-4.jpg",
        author: "Dr. Yuki Tanaka",
        publishedAt: "2026-02-09",
    },
    {
        id: "23",
        title: "Music Industry Revenue Hits All-Time High",
        description:
            "Global music industry revenues reach record levels, driven by streaming growth and live event demand.",
        content: `The global music industry has achieved record-breaking revenues, surpassing $30 billion for the first time in history. The milestone is driven primarily by continued growth in streaming subscriptions and a resurgence in live music events.\n\nStreaming now accounts for 67% of total industry revenue, with paid subscription numbers crossing the 800 million mark globally. Live events have also seen unprecedented demand, with major concert tours selling out in minutes.\n\nArtists are also finding new revenue streams through social media, brand partnerships, and direct-to-fan platforms. The democratization of music distribution has allowed independent artists to reach global audiences without traditional label support.\n\n"The music industry has never been in a healthier position," said industry analyst Rachel Foster. "The combination of streaming, live events, and new digital revenue streams has created a sustainable growth model that benefits artists and fans alike."`,
        category: "entertainment",
        image: "/placeholder-entertainment-4.jpg",
        author: "Rachel Foster",
        publishedAt: "2026-02-08",
    },
    {
        id: "24",
        title: "Nuclear Fusion Reactor Achieves Net Energy Gain Milestone",
        description:
            "Scientists achieve sustained net energy gain from nuclear fusion for the first time, bringing clean energy closer to reality.",
        content: `In what scientists are calling the most significant energy breakthrough in decades, a nuclear fusion reactor has achieved sustained net energy gain for the first time in history. The experiment produced 2.5 times more energy than was used to initiate the fusion reaction, and maintained this output for over 30 minutes.\n\nThe achievement, which took place at an international research facility, marks a critical milestone on the path to commercial fusion energy. Unlike nuclear fission, fusion produces no long-lived radioactive waste and uses fuel derived from seawater, making it potentially the cleanest and most abundant energy source imaginable.\n\n"This changes everything," said project director Dr. Hans Mueller. "We've proven that sustained fusion energy is not just theoretically possible—it's achievable with current technology. The engineering challenges ahead are significant but solvable."\n\nThe breakthrough has attracted immediate attention from governments and private investors, with several nations announcing increased funding for fusion energy research. Commercial fusion power plants could become operational within 15-20 years.`,
        category: "science",
        image: "/placeholder-science-4.jpg",
        author: "Dr. Hans Mueller",
        publishedAt: "2026-02-10",
    },
    {
        id: "25",
        title: "Autonomous Delivery Drones Get FAA Approval for Urban Areas",
        description:
            "The FAA has approved commercial drone delivery operations in major US metropolitan areas for the first time.",
        content: `The Federal Aviation Administration has granted approval for commercial drone delivery services to operate in 10 major US metropolitan areas, marking a historic expansion of autonomous aerial logistics. The decision comes after years of testing, regulatory review, and technological advancement.\n\nThe approved operators will be able to deliver packages weighing up to 5 pounds within a 10-mile radius, with deliveries expected to take an average of 15 minutes from order placement. The drones will operate at altitudes between 100 and 400 feet, using advanced obstacle avoidance systems and AI-powered navigation.\n\nRetail and food delivery companies have quickly moved to integrate drone delivery into their operations, with several planning to launch services within the next 90 days.\n\n"This is the beginning of a fundamental transformation in last-mile logistics," said transportation secretary James Mitchell. "Drone delivery will reduce traffic congestion, lower emissions, and provide faster service to consumers."`,
        category: "technology",
        image: "/placeholder-tech-5.jpg",
        author: "James Mitchell",
        publishedAt: "2026-02-08",
    },
];

export function getArticlesByCategory(category: string): Article[] {
    return articles.filter((article) => article.category === category);
}

export function getArticleById(id: string): Article | undefined {
    return articles.find((article) => article.id === id);
}

export function getFeaturedArticle(): Article {
    return articles[0];
}

export function getLatestArticles(count: number = 12): Article[] {
    return [...articles]
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
        .slice(0, count);
}
