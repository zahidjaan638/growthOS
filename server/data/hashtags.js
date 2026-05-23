const hashtagSets = {
  tech: {
    tiktok: [
      "#TechTok", "#AI", "#Technology", "#CodingLife", "#TechTips",
      "#GadgetReview", "#Programming", "#iPhone", "#Android", "#TechNews",
      "#LearnToCode", "#AITools", "#FutureTech", "#Robotics", "#WebDev",
      "#SoftwareEngineer", "#DataScience", "#MachineLearning", "#CloudComputing", "#Cybersecurity"
    ],
    youtube: [
      "#Technology", "#TechReview", "#Programming", "#CodingTutorial", "#AI",
      "#ArtificialIntelligence", "#GadgetReview", "#TechNews", "#HowTo", "#Tutorial",
      "#WebDevelopment", "#AppDevelopment", "#TechTips", "#Innovation", "#StartupTech"
    ],
  },
  business: {
    tiktok: [
      "#Business", "#Entrepreneur", "#SideHustle", "#MoneyTips", "#OnlineIncome",
      "#Freelancing", "#Dropshipping", "#Ecommerce", "#Marketing", "#PassiveIncome",
      "#FinancialFreedom", "#Hustle", "#SmallBusiness", "#StartUp", "#Success",
      "#Investing", "#CryptoTrading", "#AmazonFBA", "#DigitalMarketing", "#PersonalFinance"
    ],
    youtube: [
      "#Business", "#Entrepreneurship", "#OnlineBusiness", "#MakeMoneyOnline", "#Freelancing",
      "#DigitalMarketing", "#Investing", "#PassiveIncome", "#StartUp", "#BusinessTips",
      "#FinancialEducation", "#Ecommerce", "#AmazonFBA", "#SocialMediaMarketing", "#Growth"
    ],
  },
  entertainment: {
    tiktok: [
      "#Entertainment", "#Funny", "#Comedy", "#Viral", "#Trending",
      "#Challenge", "#Dance", "#Reaction", "#Pakistan", "#Urdu",
      "#FYP", "#ForYou", "#ForYouPage", "#Relatable", "#Memes",
      "#PakistaniTikTok", "#DesiVibes", "#FunnyVideos", "#ViralVideo", "#Content"
    ],
    youtube: [
      "#Entertainment", "#Vlog", "#Comedy", "#Reaction", "#Pakistan",
      "#UrduContent", "#FoodReview", "#Travel", "#Challenge", "#Trending",
      "#YouTubePakistan", "#DailyVlog", "#FunnyMoments", "#BestOf", "#MustWatch"
    ],
  },
};

const seoTemplates = {
  tech: {
    titles: [
      "{topic} - Complete Guide in Urdu/Hindi | {year}",
      "{topic} Tutorial for Beginners | Step by Step",
      "Top {count} {topic} You MUST Know in {year}",
      "{topic} Explained in {minutes} Minutes",
      "How to {action} - {topic} Tutorial | FREE",
    ],
    descriptions: [
      "In this video, I'll show you everything about {topic}. Whether you're a beginner or advanced, this tutorial will help you master {topic} in no time.\n\n🔥 What you'll learn:\n- {point1}\n- {point2}\n- {point3}\n\n⏰ Timestamps:\n0:00 Introduction\n{timestamps}\n\n📱 Follow me:\nTikTok: @{handle}\nInstagram: @{handle}\n\n#tech #{topic_tag} #tutorial",
    ],
  },
  business: {
    titles: [
      "How to Make Money with {topic} in {year} | Urdu/Hindi",
      "{topic} - Complete Business Guide | Earn ${amount}/Month",
      "{count} {topic} Ideas That Actually Work in {year}",
      "Start {topic} Today - Zero Investment Required",
      "{topic} Se Paise Kaise Kamayein | Complete Guide",
    ],
    descriptions: [
      "Learn how to start earning with {topic}! In this complete guide, I'll share my proven strategies that helped me earn ${amount} per month.\n\n💰 What's covered:\n- {point1}\n- {point2}\n- {point3}\n\n⏰ Timestamps:\n0:00 Introduction\n{timestamps}\n\n📱 Follow me:\nTikTok: @{handle}\nInstagram: @{handle}\n\n#business #{topic_tag} #makemoney",
    ],
  },
  entertainment: {
    titles: [
      "{topic} - You Won't Believe What Happened! 😱",
      "Reacting to {topic} | Hilarious Moments",
      "Best {topic} Compilation {year} | Must Watch",
      "{topic} Challenge - Gone Wrong! 🤣",
      "Day in My Life as a {topic} Creator",
    ],
    descriptions: [
      "Get ready for the most entertaining {topic} video! Don't forget to like, share, and subscribe for more amazing content!\n\n😂 Highlights:\n- {point1}\n- {point2}\n- {point3}\n\n⏰ Timestamps:\n0:00 Introduction\n{timestamps}\n\n📱 Follow me:\nTikTok: @{handle}\nInstagram: @{handle}\n\n#entertainment #{topic_tag} #viral",
    ],
  },
};

module.exports = { hashtagSets, seoTemplates };
