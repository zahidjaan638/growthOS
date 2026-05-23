exports.getCTASuggestions = (req, res) => {
  const { platform, category } = req.query;

  const suggestions = {
    tiktok: {
      tech: [
        { text: "🔗 Full tutorial on my website - link in bio!", type: "bio_link", effectiveness: 92 },
        { text: "📱 Download the free guide - bio link!", type: "lead_magnet", effectiveness: 88 },
        { text: "💻 Want the source code? Link in bio!", type: "bio_link", effectiveness: 85 },
        { text: "🎓 Join my free tech community - bio link!", type: "community", effectiveness: 78 },
      ],
      business: [
        { text: "💰 Free business plan template - link in bio!", type: "lead_magnet", effectiveness: 95 },
        { text: "📊 Get my income report - bio link!", type: "lead_magnet", effectiveness: 90 },
        { text: "🚀 Start your business today - link in bio!", type: "bio_link", effectiveness: 87 },
        { text: "📧 Join my newsletter for money tips - bio!", type: "email_capture", effectiveness: 82 },
      ],
      entertainment: [
        { text: "😂 More funny videos on my channel - bio link!", type: "bio_link", effectiveness: 80 },
        { text: "🎬 Behind the scenes on my website!", type: "bio_link", effectiveness: 75 },
        { text: "📸 Follow my Instagram for daily laughs!", type: "cross_platform", effectiveness: 85 },
        { text: "🎁 Exclusive content - join via bio link!", type: "lead_magnet", effectiveness: 78 },
      ],
    },
    youtube: {
      tech: [
        { text: "📥 Download resources from the description below!", type: "description_link", effectiveness: 90 },
        { text: "🔗 Full article with code on my website - link below!", type: "website_link", effectiveness: 88 },
        { text: "📧 Subscribe to my tech newsletter - link in description!", type: "email_capture", effectiveness: 85 },
        { text: "💬 Join our Discord community - link below!", type: "community", effectiveness: 82 },
      ],
      business: [
        { text: "📋 Free business toolkit - download link in description!", type: "lead_magnet", effectiveness: 93 },
        { text: "🎯 Book a free consultation - link below!", type: "consultation", effectiveness: 88 },
        { text: "📊 Full case study on my website - link in description!", type: "website_link", effectiveness: 85 },
        { text: "📧 Get weekly business tips - newsletter link below!", type: "email_capture", effectiveness: 80 },
      ],
      entertainment: [
        { text: "🎬 Watch the full uncut version on my website!", type: "website_link", effectiveness: 82 },
        { text: "📸 Daily content on Instagram - link below!", type: "cross_platform", effectiveness: 78 },
        { text: "🛍️ Check out my merch store - link in description!", type: "merch", effectiveness: 75 },
        { text: "🎁 Join the fan club - exclusive content link below!", type: "membership", effectiveness: 80 },
      ],
    },
  };

  const plat = platform || 'tiktok';
  const cat = category || 'tech';

  res.json(suggestions[plat]?.[cat] || suggestions.tiktok.tech);
};

exports.getBioLinkStrategy = (req, res) => {
  res.json({
    recommended: [
      {
        title: "Link-in-Bio Page",
        description: "Create a Linktree or Beacons page with all your important links",
        priority: 1,
        links: [
          "Latest YouTube video",
          "Free download / Lead magnet",
          "Website / Blog",
          "Online store / Merch",
          "Other social media",
        ],
      },
      {
        title: "Landing Page Strategy",
        description: "Create dedicated landing pages for each content type",
        priority: 2,
        pages: [
          { name: "Tech Resources", purpose: "Free tools and guides download" },
          { name: "Business Toolkit", purpose: "Templates and strategies" },
          { name: "Community Hub", purpose: "Discord/WhatsApp group join" },
        ],
      },
    ],
    tips: [
      "Update bio link after every new post",
      "Use UTM parameters to track traffic sources",
      "A/B test different CTAs weekly",
      "Add urgency: 'Limited time free download!'",
      "Match bio link to your latest content theme",
    ],
  });
};

exports.getLeadCaptureStrategy = (req, res) => {
  res.json({
    strategies: [
      {
        name: "Free Resource Download",
        description: "Offer a free PDF, template, or toolkit in exchange for email",
        conversionRate: "25-40%",
        difficulty: "Easy",
        examples: [
          "Free AI Tools Checklist (PDF)",
          "Business Plan Template",
          "Content Calendar Template",
          "Hashtag Research Guide",
        ],
      },
      {
        name: "Email Newsletter",
        description: "Weekly/monthly newsletter with exclusive tips",
        conversionRate: "10-20%",
        difficulty: "Medium",
        examples: [
          "Weekly Tech Digest",
          "Money Making Monday Tips",
          "Creator Growth Weekly",
        ],
      },
      {
        name: "Free Mini Course",
        description: "3-5 day email course on a specific topic",
        conversionRate: "30-50%",
        difficulty: "Medium",
        examples: [
          "5-Day Freelancing Bootcamp",
          "3-Day AI Mastery Course",
          "7-Day Content Creation Challenge",
        ],
      },
      {
        name: "WhatsApp/Telegram Community",
        description: "Free community group with exclusive content",
        conversionRate: "15-30%",
        difficulty: "Easy",
        examples: [
          "Tech Updates Group",
          "Business Ideas Community",
          "Creator Network",
        ],
      },
    ],
    emailTools: [
      { name: "Mailchimp", cost: "Free up to 500 contacts", recommended: true },
      { name: "ConvertKit", cost: "Free up to 1000 contacts", recommended: true },
      { name: "Beehiiv", cost: "Free up to 2500 contacts", recommended: true },
    ],
  });
};
