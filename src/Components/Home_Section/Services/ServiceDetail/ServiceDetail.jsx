import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ServiceDetail.css';
import TechDrButtons from '../../TechDrButtons/TechDrButtons';

const serviceDetails = {
    'gaming-pc-building-repair': {
        title: 'Gaming PC Building & Repair',
        tagline: 'Dominate the Game with Your Perfect Rig',
        image1: 'https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2FtaW5nJTIwUEMlMjBCdWlsZGluZyUyMCUyNiUyMFJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D',
        image2: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
        description: `At The Tech Dr, we live and breathe gaming PCs. Whether you want a custom-built monster rig from scratch or need your existing setup diagnosed and repaired, our certified technicians have the expertise to deliver peak performance.`,
        description2: `Our team understands that every gamer has unique needs — from budget builds to ultra-high-end rigs with liquid cooling and custom RGB setups. We take the guesswork out of PC building and ensure your system is optimised for maximum framerates and stability.`,
        whatWeOffer: [
            'Custom gaming PC builds tailored to your budget and game requirements',
            'GPU, CPU & RAM upgrades for higher framerates',
            'Cooling system installation (air & liquid cooling)',
            'Overclocking & performance tuning',
            'Virus & malware removal affecting game performance',
            'Hardware diagnostics & component-level repairs',
            'RGB setup & cable management',
        ],
        problemsSolved: [
            'PC crashing or freezing during games',
            'Low FPS and poor graphics performance',
            'Overheating and thermal throttling',
            'Blue screen of death (BSOD) errors',
            'Incompatible hardware after upgrades',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=800&q=80',
            'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
            'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
        ],
        faq: [
            { q: 'How long does a custom gaming PC build take?', a: 'Most builds are completed within 1–3 business days depending on component availability. We will give you an exact timeframe when you enquire.' },
            { q: 'Do you offer a warranty on gaming PC builds?', a: 'Yes — all builds come with a 12-month warranty on labour. Component warranties are passed on directly from the manufacturer.' },
            { q: 'Can you upgrade my existing gaming PC?', a: 'Absolutely. We can assess your current system and recommend the most cost-effective upgrades to boost your performance.' },
        ],
    },
    'mac-windows-pc-repair': {
        title: 'Mac & Windows PC Repair',
        tagline: 'Expert Repairs for Apple & Windows Devices',
        image1: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
        description: `From sluggish MacBooks to virus-ridden Windows laptops, The Tech Dr provides comprehensive repair services for all Apple and Windows devices. Our certified technicians diagnose and fix issues quickly, getting you back to work without delay.`,
        description2: `We handle everything from screen replacements and keyboard repairs to full motherboard-level diagnostics. No matter the brand or model, our team has the tools and expertise to restore your device to full health.`,
        whatWeOffer: [
            'MacBook & iMac screen replacements',
            'Windows laptop motherboard & component repairs',
            'Virus, malware & ransomware removal',
            'Operating system reinstallation & data preservation',
            'Battery replacements for laptops',
            'Keyboard & trackpad repairs',
            'Fan cleaning & thermal paste replacement',
        ],
        problemsSolved: [
            'Slow or freezing computer',
            'Cracked or black screens',
            "Won't turn on or boot properly",
            'Constant pop-ups and browser redirects',
            'Overheating and loud fan noise',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
        ],
        faq: [
            { q: 'Do you repair all MacBook models?', a: 'Yes — we repair all MacBook Air, MacBook Pro, iMac, and Mac Mini models including the latest Apple Silicon chips.' },
            { q: 'How long does a typical repair take?', a: 'Most repairs are completed same-day or within 24 hours. Complex repairs like motherboard work may take 2–3 days.' },
            { q: 'Will I lose my data during a repair?', a: 'We always back up your data before any repair work begins. Data preservation is a core part of our repair process.' },
        ],
    },
    'internet-email-issues': {
        title: 'Internet & Email Issues',
        tagline: 'Stay Connected — We Fix It Fast',
        image1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        description: `Dropped connections, slow speeds, and broken email accounts are frustrating — but The Tech Dr resolves them quickly. We diagnose root causes rather than applying temporary fixes, ensuring you stay reliably online.`,
        description2: `Whether you are a home user struggling with Wi-Fi dropouts or a business with email delivery failures, our technicians have the tools and experience to identify and resolve the issue permanently.`,
        whatWeOffer: [
            'ISP connection troubleshooting & modem/router configuration',
            'Email account setup & recovery (Gmail, Outlook, Apple Mail)',
            'Spam & phishing filter configuration',
            'Wi-Fi dead zone elimination',
            'VPN setup for secure remote access',
            'Business email configuration (Microsoft 365, Google Workspace)',
        ],
        problemsSolved: [
            'Internet dropping out frequently',
            'Cannot send or receive emails',
            'Emails going to spam or being blocked',
            'Slow internet despite fast plan',
            'Unable to access email on new device',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1610986603166-f78428624e76?w=800&q=80',
            'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80',
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        ],
        faq: [
            { q: 'Why does my internet keep dropping out?', a: 'Common causes include faulty modem/router hardware, ISP line issues, incorrect DNS settings, or interference from other devices. We diagnose and fix all of these.' },
            { q: 'Can you set up email on multiple devices?', a: 'Yes — we configure email across all your phones, tablets, and computers in a single visit.' },
            { q: 'Do you work with business email platforms?', a: 'Absolutely. We support Microsoft 365, Google Workspace, cPanel email, and all major hosted email platforms.' },
        ],
    },
    'hardware-upgrades-repair': {
        title: 'Hardware Upgrades & Repair',
        tagline: 'Breathe New Life Into Your Device',
        image1: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
        description: `You don't always need a new computer — sometimes a targeted upgrade is all it takes. The Tech Dr supplies and installs high-performance components that dramatically improve your device's speed, storage, and reliability.`,
        description2: `Our technicians assess your current setup and recommend the most cost-effective upgrade path — whether that's an SSD swap, RAM increase, or a GPU replacement. We use quality components backed by manufacturer warranties.`,
        whatWeOffer: [
            'SSD installation (up to 10x faster than traditional HDDs)',
            'RAM upgrades for multitasking performance',
            'Graphics card (GPU) replacement & installation',
            'Power supply unit (PSU) replacement',
            'Optical drive & port expansions',
            'Component-level soldering repairs',
        ],
        problemsSolved: [
            'Computer taking too long to start up',
            'Running out of storage space',
            'Programs crashing due to insufficient RAM',
            'Graphics lag on video editing or gaming',
            'Hardware failure after power surges',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1600348712270-5af9e3590f63?w=800&q=80',
            'https://images.unsplash.com/photo-1562976540-1502c2145851?w=800&q=80',
            'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
        ],
        faq: [
            { q: 'How much faster will an SSD make my computer?', a: 'In most cases, upgrading from an HDD to an SSD reduces boot times from 60+ seconds down to under 15 seconds and dramatically speeds up everyday tasks.' },
            { q: 'How do I know how much RAM my computer needs?', a: 'We assess your usage patterns and current specs to recommend the right amount. Most modern systems benefit from at least 16GB.' },
            { q: 'Do you supply the components or do I need to buy them?', a: 'We can supply all components at competitive prices, or install parts you have already purchased yourself.' },
        ],
    },
    'software-device-tutorials': {
        title: 'Software & Device Tutorials',
        tagline: 'Learn Tech at Your Own Pace',
        image1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        description: `Technology shouldn't be intimidating. The Tech Dr provides friendly, patient, one-on-one tutorials to help you confidently use your devices, software, and apps — at your own pace, in plain language.`,
        description2: `Whether you're a senior getting to grips with a new smartphone or a small business owner learning Microsoft 365, we tailor every session to your level and goals. No jargon, no rush — just clear, practical guidance.`,
        whatWeOffer: [
            'New device setup & orientation (phones, tablets, laptops)',
            'Microsoft 365 & Google Workspace training',
            'iPhone & Android tips and tricks',
            'Online safety & password management',
            'Video calling setup (Zoom, Teams, FaceTime)',
            'File management, backups & cloud storage guides',
        ],
        problemsSolved: [
            'Confused by a new phone, tablet or laptop',
            'Struggling to use work software',
            'Not sure how to safely browse the internet',
            "Can't figure out video calling apps",
            'Losing important files or photos',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
            'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        ],
        faq: [
            { q: 'Do I need any prior tech knowledge?', a: 'Not at all — our tutorials are designed for complete beginners through to intermediate users. We meet you where you are.' },
            { q: 'How long is a typical tutorial session?', a: 'Sessions are usually 1–2 hours. We can schedule follow-up sessions if needed to cover everything at a comfortable pace.' },
            { q: 'Can you do tutorials at my home?', a: 'Yes — we offer on-site tutorials at your home or business so you learn in the environment where you will actually use the technology.' },
        ],
    },
    'network-wireless-set-up': {
        title: 'Network & Wireless Set Up',
        tagline: 'Fast, Reliable Wi-Fi Everywhere',
        image1: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80',
        description: `Dead zones and slow Wi-Fi are a thing of the past with The Tech Dr. We design, install, and secure wired and wireless networks for homes and businesses — optimized for speed, coverage, and security.`,
        description2: `A well-designed network is the backbone of a productive home or business. We don't just plug in a router — we plan the optimal placement, configure security settings, and test coverage throughout your entire space.`,
        whatWeOffer: [
            'Home & office Wi-Fi network design & installation',
            'Mesh network setup for full-home coverage',
            'Network security configuration & firewall setup',
            'Wired Ethernet cabling & switch installation',
            'Router & modem configuration',
            'Guest network & parental control setup',
            'Network speed optimization',
        ],
        problemsSolved: [
            'Wi-Fi not reaching all rooms',
            'Slow speeds despite fast internet plan',
            'Unauthorised users on your network',
            'Multiple devices dropping connection',
            'Setting up a home office network',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
            'https://images.unsplash.com/photo-1519558260268-cde7e03a0b0f?w=800&q=80',
        ],
        faq: [
            { q: 'What is a mesh network and do I need one?', a: 'A mesh network uses multiple access points to blanket your entire home in Wi-Fi. If you have dead zones or a large property, it is usually the best solution.' },
            { q: 'Can you set up a separate network for guests?', a: 'Yes — we set up isolated guest networks so visitors can access the internet without touching your main network or devices.' },
            { q: 'How do I know if my network is secure?', a: 'We perform a full network audit and configure WPA3 encryption, firewall rules, and strong passwords to protect your network.' },
        ],
    },
    'mobile-phone-email-set-up': {
        title: 'Mobile Phone Email Set Up',
        tagline: 'Your Inbox, Perfectly Configured',
        image1: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80',
        description: `Stay connected on the go with perfectly configured email on your smartphone or tablet. The Tech Dr handles all email platforms on both iOS and Android — quickly and securely.`,
        description2: `Getting email set up on a new phone can be tricky, especially for business accounts with specific server settings. We take care of everything — from entering the right server details to ensuring your contacts and calendar sync perfectly.`,
        whatWeOffer: [
            'Gmail, Outlook & Apple Mail setup on all devices',
            'Microsoft 365 & Exchange email configuration',
            'Multiple email account management',
            'Sync settings for contacts & calendar',
            'Email signature setup',
            'Spam filter & security settings',
        ],
        problemsSolved: [
            'Emails not syncing on phone',
            "Can't add work email to personal device",
            'Password reset & account recovery',
            'Missing emails or folders on mobile',
            'Setting up email on a new phone',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80',
            'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80',
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        ],
        faq: [
            { q: 'Can you set up multiple email accounts on one phone?', a: 'Yes — we configure as many email accounts as you need, including personal and work accounts on the same device.' },
            { q: 'What if I have forgotten my email password?', a: 'We guide you through the recovery process and set up a new password, then configure everything on your device.' },
            { q: 'Do you support both iPhone and Android?', a: 'Absolutely — we configure email on all iOS and Android devices across all major email providers.' },
        ],
    },
    'cctv-setup-servicing': {
        title: 'CCTV Setup & Servicing',
        tagline: 'Professional Security You Can Trust',
        image1: 'https://images.unsplash.com/photo-1589935447067-5531094415d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q0NUViUyMFNldHVwJTIwJTI2JTIwU2VydmljaW5nfGVufDB8fDB8fHww',
        image2: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80',
        description: `Protect your home or business with a professionally installed CCTV system from The Tech Dr. We supply, install, and maintain high-definition security camera systems with remote viewing capability.`,
        description2: `A properly installed CCTV system is one of the most effective deterrents against theft and vandalism. We design a camera layout that maximises coverage of your property and ensures footage is stored securely and accessible remotely.`,
        whatWeOffer: [
            'HD & 4K CCTV camera supply & installation',
            'DVR/NVR recorder setup & configuration',
            'Remote viewing setup on smartphone or PC',
            'Motion detection & alert configuration',
            'Night vision camera installation',
            'Existing system servicing & repairs',
            'Cable management & weatherproofing',
        ],
        problemsSolved: [
            'No security coverage of property',
            'Old CCTV system not recording properly',
            'Cannot view cameras remotely',
            'Footage quality too poor to identify intruders',
            'Cameras offline or not connecting to recorder',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80',
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
        ],
        faq: [
            { q: 'How many cameras do I need for my home?', a: 'We assess your property and recommend the optimal number and placement. Most homes need 4–8 cameras for complete coverage.' },
            { q: 'Can I view my cameras on my phone?', a: 'Yes — we set up remote viewing on your smartphone so you can check your cameras from anywhere in the world.' },
            { q: 'Do you service existing CCTV systems?', a: 'Absolutely — we repair and upgrade existing systems regardless of brand. We can also integrate new cameras into an existing setup.' },
        ],
    },
    'servers-setup': {
        title: 'Servers Setup',
        tagline: 'Reliable Infrastructure for Growing Businesses',
        image1: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&q=80',
        description: `Power your business with a robust, scalable server solution from The Tech Dr. We design, install, and manage server infrastructure for small to medium businesses — on-premise or hybrid cloud.`,
        description2: `A reliable server is the foundation of any productive business. Whether you need a file server for team collaboration, a domain controller for user management, or a full virtualised environment — we design and deploy it to your exact requirements.`,
        whatWeOffer: [
            'Physical server supply, rack mounting & configuration',
            'Windows Server & Linux server setup',
            'File server & shared storage configuration',
            'Active Directory & domain setup',
            'Backup & disaster recovery configuration',
            'Remote desktop & VPN server setup',
            'Ongoing server maintenance & monitoring',
        ],
        problemsSolved: [
            'Staff unable to share files securely',
            'No centralised backup solution',
            "Remote workers can't access business systems",
            'Slow network performance due to poor infrastructure',
            'Security vulnerabilities in existing server setup',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1601225998165-b4e6e8a57339?w=800&q=80',
            'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        ],
        faq: [
            { q: 'Do I need an on-premise server or cloud?', a: 'This depends on your business size, budget, and requirements. We assess your needs and recommend the most suitable and cost-effective solution.' },
            { q: 'Can you migrate data from our old server?', a: 'Yes — we handle full data migrations with minimal downtime, ensuring all files, permissions, and settings are transferred correctly.' },
            { q: 'Do you offer ongoing server management?', a: 'Yes — we offer managed server plans that include monitoring, updates, backups, and helpdesk support for a fixed monthly fee.' },
        ],
    },
    'data-recovery': {
        title: 'Data Recovery',
        tagline: 'Your Lost Data — Recovered',
        image1: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGF0YSUyMFJlY292ZXJ5fGVufDB8fDB8fHww',
        description: `Lost files, a failing hard drive, or an accidental format doesn't have to mean permanent data loss. The Tech Dr uses professional-grade tools to recover your invaluable documents, photos, videos, and business data.`,
        description2: `Data loss is one of the most stressful tech experiences — whether it is years of family photos or critical business files. Our technicians use industry-leading recovery software and techniques to retrieve your data safely and confidentially.`,
        whatWeOffer: [
            'Deleted file & folder recovery',
            'Failed or clicking hard drive data extraction',
            'SSD & flash drive data recovery',
            'Formatted or corrupted partition recovery',
            'RAID array data recovery',
            'Ransomware-encrypted file recovery assistance',
            'Photo & video recovery from memory cards',
        ],
        problemsSolved: [
            'Accidentally deleted important files',
            'Hard drive making clicking noises',
            "Computer won't boot and data is needed urgently",
            'Files corrupted after a power outage',
            'Accidentally formatted the wrong drive',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80',
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        ],
        faq: [
            { q: 'Is data recovery always possible?', a: 'Not always — but in most cases we can recover some or all of your data. We give you a honest assessment before starting any recovery work.' },
            { q: 'What should I do if my hard drive makes clicking noises?', a: 'Stop using the drive immediately. Every power cycle can cause further damage. Contact us right away for the best chance of recovery.' },
            { q: 'How long does data recovery take?', a: 'Simple recoveries can be completed in a few hours. Complex cases involving physically damaged drives may take 2–5 business days.' },
        ],
    },
    'business-phone-system-set-up': {
        title: 'Business Phone System Set Up',
        tagline: 'Modern VoIP Communications for Your Team',
        image1: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        description: `Upgrade your business communications with a scalable VoIP phone system from The Tech Dr. We configure and install modern cloud-based phone systems that grow with your business and work from anywhere.`,
        description2: `Old landline systems are costly and limiting. Modern VoIP phone systems give your team professional call handling features — hold music, call routing, voicemail-to-email, and mobile apps — at a fraction of the cost.`,
        whatWeOffer: [
            'VoIP phone system supply & configuration',
            'Cloud PBX setup (3CX, RingCentral, Microsoft Teams Phone)',
            'Number porting & new business number setup',
            'Call routing, IVR & voicemail configuration',
            'Softphone & mobile app setup for remote teams',
            'Headset & hardware configuration',
            'Ongoing system support & changes',
        ],
        problemsSolved: [
            'Outdated landline system costing too much',
            'Remote staff unable to receive business calls',
            'No professional call routing or hold music',
            'Missing calls due to poor coverage',
            'Need a second phone number for business',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1556742400-b5b7b3085ba1?w=800&q=80',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
        ],
        faq: [
            { q: 'Can I keep my existing business phone number?', a: 'Yes — we handle number porting so your existing number transfers to the new VoIP system with no interruption to your calls.' },
            { q: 'Can remote staff use the phone system?', a: 'Absolutely. VoIP systems work on any internet connection via a desk phone, computer, or mobile app — perfect for remote and hybrid teams.' },
            { q: 'How much does a VoIP system cost compared to a landline?', a: 'Most businesses save 40–60% on their phone bills by switching to VoIP. We provide a full cost comparison before any commitment.' },
        ],
    },
    'protection-from-hackers': {
        title: 'Protection From Hackers',
        tagline: 'Cybersecurity That Keeps You Safe',
        image1: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
        description: `Cyber threats are more sophisticated than ever. The Tech Dr implements robust, layered cybersecurity measures to protect your personal data and business systems from hackers, malware, and data breaches.`,
        description2: `A single cyberattack can cost a small business thousands of dollars and destroy customer trust. We implement proven, multi-layered security strategies that protect your devices, data, and network — before attackers get a chance.`,
        whatWeOffer: [
            'Advanced firewall installation & configuration',
            'Antivirus & endpoint protection deployment',
            'Network vulnerability assessment & audit',
            'Two-factor authentication (2FA) setup',
            'Password manager setup & training',
            'Dark web monitoring for compromised credentials',
            'Staff cybersecurity awareness training',
        ],
        problemsSolved: [
            'Suspicious activity on accounts or devices',
            'Business email compromise (BEC) attacks',
            'Ransomware infection & recovery',
            'Weak passwords being exploited',
            'No security policy or staff training',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        ],
        faq: [
            { q: 'How do I know if I have already been hacked?', a: 'Signs include slow device performance, unexpected account activity, unfamiliar programs, or ransomware messages. Contact us for a security audit.' },
            { q: 'What is two-factor authentication and why do I need it?', a: '2FA adds a second layer of security beyond your password — usually a code sent to your phone. It blocks most account takeover attempts even if your password is stolen.' },
            { q: 'Do you offer cybersecurity training for staff?', a: 'Yes — we run practical training sessions to help your team recognise phishing emails, social engineering attempts, and unsafe online behaviour.' },
        ],
    },
    'starlink-set-up': {
        title: 'Starlink Set Up',
        tagline: 'High-Speed Satellite Internet, Anywhere',
        image1: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
        description: `Experience the future of internet connectivity with Starlink. The Tech Dr provides professional installation, positioning, and network integration of your Starlink dish and router for maximum signal and speed.`,
        description2: `Starlink is revolutionising internet access in rural and regional Australia. A professional installation makes all the difference — correct positioning, proper mounting, and seamless integration with your existing network ensures you get the speeds Starlink promises.`,
        whatWeOffer: [
            'Starlink dish site survey & optimal positioning',
            'Roof, wall or pole mounting installation',
            'Starlink router configuration & Wi-Fi setup',
            'Integration with existing home or business network',
            'Cable routing & weatherproofing',
            'Speed testing & performance optimisation',
        ],
        problemsSolved: [
            'No reliable internet in rural or remote areas',
            'Existing NBN or cable connection too slow',
            'Starlink dish installed but getting poor speeds',
            'Need internet at a remote worksite or farm',
            'Starlink not connecting after self-install',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=800&q=80',
            'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
            'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80',
        ],
        faq: [
            { q: 'Where should the Starlink dish be positioned?', a: 'The dish needs a clear, unobstructed view of the sky. We conduct a site survey using the Starlink app to find the optimal location on your property.' },
            { q: 'Can Starlink work with my existing router?', a: 'Yes — we can bypass the Starlink router and integrate it with your existing network equipment for a seamless setup.' },
            { q: 'What speeds can I expect from Starlink?', a: 'Most Starlink residential customers achieve 100–200 Mbps download speeds. A proper professional installation maximises your performance.' },
        ],
    },
    'managed-services-provider-msp': {
        title: 'Managed Services Provider (MSP)',
        tagline: 'All-In-One IT Management for Your Business',
        image1: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
        image2: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
        description: `Let The Tech Dr handle all your IT so you can focus on running your business. Our managed services provide proactive monitoring, helpdesk support, cybersecurity, and full IT management for a fixed monthly fee.`,
        description2: `Stop reacting to IT problems and start preventing them. As your Managed Services Provider, The Tech Dr monitors your systems 24/7, patches vulnerabilities before they are exploited, and provides unlimited helpdesk support so your team is never left waiting.`,
        whatWeOffer: [
            '24/7 helpdesk support for all staff',
            'Proactive system monitoring & maintenance',
            'Microsoft 365 & Google Workspace management',
            'Automated backup & disaster recovery',
            'Endpoint security & patch management',
            'VoIP phone system management',
            'Monthly IT reports & strategic planning',
        ],
        problemsSolved: [
            'No dedicated IT team or support',
            'Unpredictable IT costs from break-fix repairs',
            'Security vulnerabilities going undetected',
            'Staff productivity lost to IT issues',
            'Compliance & data protection requirements',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        ],
        faq: [
            { q: 'What is the difference between MSP and break-fix IT support?', a: 'Break-fix means you call someone when something goes wrong. MSP is proactive — we monitor, maintain, and prevent issues before they impact your business.' },
            { q: 'How much does managed IT support cost?', a: 'Pricing is based on the number of users and devices. Most small businesses find MSP pricing is similar to or less than the cost of a single major IT incident.' },
            { q: 'Can you manage our Microsoft 365 or Google Workspace?', a: 'Yes — we handle licencing, user management, security configuration, and ongoing administration of both platforms.' },
        ],
    },
};

const FaqItem = ({ question, answer }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="svc-faq-item">
            <button
                className={`svc-faq-question ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
            >
                {question}
                <span className="svc-faq-chevron">{open ? '▲' : '▼'}</span>
            </button>
            {open && <p className="svc-faq-answer">{answer}</p>}
        </div>
    );
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    // const [quoteHover, setQuoteHover] = useState(false);
    const [callHover, setCallHover] = useState(false);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    const service = serviceDetails[slug];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (service) {
            document.title = `${service.title} | The Tech Dr`;
        }
    }, [slug, service]);

    if (!service) {
        return (
            <div className="svc-page">
                <div className="svc-topbar" />
                <div className="svc-content">
                    <button className="svc-back-btn" onClick={() => navigate('/services')}>
                        <svg viewBox="0 0 24 24" fill="none" className="svc-back-arrow">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#E8623A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to All Services
                    </button>
                    <p style={{ color: '#666' }}>Service not found. Slug: <strong>{slug}</strong></p>
                </div>
            </div>
        );
    }

    return (
        <div className="svc-page">
            <div className="svc-topbar" />

            <div className="svc-content">

                {/* Back button */}
                <button className="svc-back-btn" onClick={() => navigate('/services')}>
                    <svg viewBox="0 0 24 24" fill="none" className="svc-back-arrow">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#E8623A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to All Services
                </button>

                {/* Title */}
                <h1 className="svc-title">{service.title}</h1>
                <h1 className="svc-title">— TheTechDr</h1>
                <p className="svc-area-tag">The Tech Dr · Professional IT Services · Australia-Wide</p>

                <div className="btn-wrapper">
                    <div className="call-and-booking-section">
                        <Link to="/book-now" onClick={() => { handleClick() }} className="btn-link">
                            <button
                                className={`btn btn-call ${callHover ? "btn-call--hover" : ""}`}
                                onMouseEnter={() => setCallHover(true)}
                                onMouseLeave={() => setCallHover(false)}
                            >
                                <span className="btn-icon"></span>
                                BOOK NOW
                            </button>
                        </Link>
                    </div>


                </div>

                {/* Intro */}
                <p className="svc-intro">
                    Need expert help with <strong>{service.title}</strong>?{' '}
                    <strong>We're just one call away!</strong>{' '}
                    <a href="tel:1300072073" className="svc-phone">1300 072 073</a>
                </p>

                <p className="svc-bold-para">{service.description}</p>

                {/* Dual Images */}
                <div className="svc-images">
                    <img src={service.image1} alt={`${service.title} 1`} className="svc-img" />
                    <img src={service.image2} alt={`${service.title} 2`} className="svc-img" />
                </div>

                <p className="svc-para">{service.description2}</p>

                <p className="svc-para">
                    Call <a href="tel:1300072073" className="svc-phone">1300 072 073</a> today and speak with a friendly technician. We offer fast, reliable service — so you're never left waiting long.
                </p>

                <div className="svc-divider" />

                {/* What We Offer + Problems Solved */}
                <div className="svc-two-col">
                    <div>
                        <h2 className="svc-subtitle">What We Offer</h2>
                        <ul className="svc-list">
                            {service.whatWeOffer.map((item, i) => (
                                <li key={i}>
                                    <span className="svc-dot" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="svc-subtitle">Problems We Solve</h2>
                        <ul className="svc-list svc-list-problems">
                            {service.problemsSolved.map((item, i) => (
                                <li key={i}>
                                    <span className="svc-dot svc-dot-arrow">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="svc-divider" />

                {/* Why choose us highlight cards */}
                <h2 className="svc-subtitle">Why Choose The Tech Dr</h2>
                <div className="svc-highlights">
                    <div className="svc-highlight-card">
                        <span className="svc-highlight-icon">⚡</span>
                        <strong>Same-Day Service</strong>
                        <p>Fast response across all areas</p>
                    </div>
                    <div className="svc-highlight-card">
                        <span className="svc-highlight-icon">✅</span>
                        <strong>No Fix, No Pay</strong>
                        <p>You only pay when resolved</p>
                    </div>
                    <div className="svc-highlight-card">
                        <span className="svc-highlight-icon">💰</span>
                        <strong>Transparent Pricing</strong>
                        <p>Upfront quotes, no hidden fees</p>
                    </div>
                    <div className="svc-highlight-card">
                        <span className="svc-highlight-icon">🔒</span>
                        <strong>Fully Insured</strong>
                        <p>Background-checked technicians</p>
                    </div>
                </div>

                <div className="svc-divider" />

                {/* Gallery */}
                <h2 className="svc-subtitle">Gallery</h2>
                <div className="svc-gallery">
                    {service.gallery.map((img, i) => (
                        <div className="svc-gallery-item" key={i}>
                            <img src={img} alt={`${service.title} ${i + 1}`} loading="lazy" />
                        </div>
                    ))}
                </div>

                <div className="svc-divider" />

                {/* FAQ */}
                {service.faq && service.faq.length > 0 && (
                    <>
                        <h2 className="svc-subtitle">Frequently Asked Questions</h2>
                        <div className="svc-faq">
                            {service.faq.map((item, i) => (
                                <FaqItem key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                        <div className="svc-divider" />
                    </>
                )}

                {/* CTA Box */}
                <div className="svc-cta-box">
                    <h3 className="svc-cta-heading">Ready to Get Started with {service.title}?</h3>
                    <p className="svc-cta-text">
                        Fast · Reliable · Affordable IT Support<br />
                        Contact <strong>TheTechDr</strong> now — same-day service available!
                    </p>
                    <a href="tel:1300072073" className="svc-cta-btn">
                        📞 Call 1300 072 073 Now
                    </a>
                    <p className="svc-website">
                        Visit us at:{' '}
                        <a href="https://www.thetechdr.com.au" className="svc-link">
                            www.TheTechDr.com.au
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ServiceDetail;