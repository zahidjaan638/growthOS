exports.generateScript = (req, res) => {
  const { platform, topic, category, language } = req.body;

  const isTikTok = platform === 'tiktok';
  const isUrdu = language === 'ur';

  const scripts = {
    tiktok: {
      ur: {
        tech: {
          hook: `🔥 رُکو! کیا آپ جانتے ہیں کہ "${topic || 'یہ AI ٹول'}" آپ کی زندگی بدل سکتا ہے؟`,
          content: `آج میں آپ کو بتاتا ہوں ${topic || 'اس ٹیکنالوجی'} کے بارے میں جو 2025 میں سب سے زیادہ ٹرینڈ کر رہی ہے۔\n\nسب سے پہلے، یہ بالکل مفت ہے ✅\nدوسرا، اسے استعمال کرنا بہت آسان ہے 📱\nتیسرا، یہ آپ کا وقت اور پیسے دونوں بچائے گا 💰\n\nبس آپ کو یہ کرنا ہے:\n1. اپنا فون اٹھائیں\n2. یہ ایپ ڈاؤن لوڈ کریں\n3. اور فوری طور پر استعمال شروع کریں`,
          cta: `🚀 ابھی فالو کریں تاکہ ایسے مزید ٹپس ملیں!\n👆 بائیو میں لنک پر کلک کریں\n💬 کمنٹ میں بتائیں آپ نے کیا سیکھا!`,
        },
        business: {
          hook: `💰 کیا آپ گھر بیٹھے ${topic || 'آن لائن'} پیسے کمانا چاہتے ہیں؟`,
          content: `آج میں آپ کو وہ طریقہ بتاؤں گا جس سے میں نے ${topic || 'فری لانسنگ'} سے ہر مہینے لاکھوں کمائے۔\n\nسب سے اہم بات:\n✅ کوئی سرمایہ نہیں لگتا\n✅ گھر بیٹھے کام ہوتا ہے\n✅ موبائل سے بھی کر سکتے ہیں\n\nبس تین آسان مراحل:\n1. اکاؤنٹ بنائیں\n2. اپنی سکِل دکھائیں\n3. پیسے کمانا شروع کریں`,
          cta: `🔥 مزید تفصیلات کے لیے فالو کریں!\n🔗 بائیو لنک پر مکمل گائیڈ موجود ہے\n💬 سوالات؟ کمنٹ میں پوچھیں!`,
        },
        entertainment: {
          hook: `😂 بھائی! یہ ویڈیو دیکھ کر آپ ہنسنا نہیں روک پائیں گے!`,
          content: `آج کی ویڈیو میں ہم ${topic || 'پاکستان کی سب سے مزیدار'} چیزوں کے بارے میں بات کریں گے۔\n\nآپ سوچ بھی نہیں سکتے کہ:\n😱 یہ کتنا عجیب ہے\n🤣 لوگوں نے کیا کیا\n🔥 اور آخر میں کیا ہوا\n\nچلیں شروع کرتے ہیں اور مزے کرتے ہیں!`,
          cta: `❤️ لائیک اور شیئر ضرور کریں!\n👉 فالو کریں مزید مزیدار ویڈیوز کے لیے\n💬 بتائیں آپ کو کون سا حصہ سب سے زیادہ پسند آیا!`,
        },
      },
      en: {
        tech: {
          hook: `🔥 STOP scrolling! This ${topic || 'AI tool'} is going to change EVERYTHING!`,
          content: `Let me show you the most insane ${topic || 'tech hack'} that's trending in 2025.\n\nFirst - it's completely FREE ✅\nSecond - it takes 30 seconds to set up 📱\nThird - it will save you HOURS every day 💰\n\nHere's what you do:\n1. Open your phone\n2. Download this app\n3. Start using it RIGHT NOW`,
          cta: `🚀 Follow for more tech tips!\n👆 Link in bio for the full guide\n💬 Drop a comment if this helped!`,
        },
        business: {
          hook: `💰 Want to know how I make $${Math.floor(Math.random() * 10 + 5)}K/month from ${topic || 'my phone'}?`,
          content: `I'm about to reveal the exact ${topic || 'side hustle'} strategy that changed my life.\n\nThe best part:\n✅ Zero investment needed\n✅ Work from anywhere\n✅ Start earning within a week\n\nThree simple steps:\n1. Create your account\n2. Set up your profile\n3. Start making money`,
          cta: `🔥 Follow for more money tips!\n🔗 Full tutorial in bio link\n💬 Questions? Ask in comments!`,
        },
        entertainment: {
          hook: `😂 You will NOT believe what happened when I tried ${topic || 'this challenge'}!`,
          content: `Today we're going to talk about the most ${topic || 'hilarious viral moments'} you've ever seen.\n\nYou won't believe:\n😱 How crazy this gets\n🤣 What people actually did\n🔥 The unexpected ending\n\nLet's dive in and have some fun!`,
          cta: `❤️ Like and share if you laughed!\n👉 Follow for more entertainment\n💬 Tell me your favorite part in comments!`,
        },
      },
    },
    youtube: {
      ur: {
        tech: {
          hook: `السلام علیکم دوستو! آج کی ویڈیو میں ہم بات کریں گے "${topic || 'ٹیکنالوجی کی دنیا'}" کے بارے میں جو 2025 میں سب کچھ بدلنے والی ہے۔ اگر آپ ابھی تک اس کے بارے میں نہیں جانتے تو یہ ویڈیو آپ کے لیے ہے!`,
          content: `تو دوستو، آئیے شروع کرتے ہیں!\n\n📌 سب سے پہلے بات کرتے ہیں کہ ${topic || 'یہ ٹیکنالوجی'} کیا ہے:\nیہ ایک ایسا ٹول ہے جو آپ کے کام کو آسان بنا دیتا ہے۔ آج کل پوری دنیا میں اس کا استعمال بڑھ رہا ہے اور پاکستان میں بھی لوگ اسے اپنا رہے ہیں۔\n\n📌 اب بات کرتے ہیں اس کے فائدوں کی:\n1. وقت کی بچت - آپ کا کام گھنٹوں کی بجائے منٹوں میں ہو جائے گا\n2. پیسوں کی بچت - بالکل مفت ورژن دستیاب ہے\n3. آسان استعمال - کوئی بھی سیکھ سکتا ہے\n\n📌 عملی مثال:\nچلیں میں آپ کو لائیو دکھاتا ہوں کہ یہ کیسے کام کرتا ہے...\n[اسکرین شیئرنگ / ڈیمو]\n\n📌 میری ذاتی رائے:\nمیں خود پچھلے 6 مہینوں سے یہ استعمال کر رہا ہوں اور میری پروڈکٹیوٹی 3 گنا بڑھ گئی ہے۔ آپ بھی ضرور ٹرائی کریں!\n\n📌 عام غلطیاں:\nلوگ اکثر یہ غلطیاں کرتے ہیں - ان سے بچیں:\n- بغیر سمجھے استعمال کرنا\n- سیٹنگز تبدیل نہ کرنا\n- ریگولر اپڈیٹ نہ کرنا`,
          cta: `تو دوستو، امید ہے آپ کو یہ ویڈیو پسند آئی ہوگی۔\n\n👍 اگر آپ نے کچھ نیا سیکھا تو لائیک ضرور کریں\n🔔 چینل سبسکرائب کریں اور بیل آئیکن آن کریں\n💬 کمنٹ میں بتائیں آپ کون سا ٹول استعمال کرتے ہیں\n🔗 نیچے ڈسکرپشن میں تمام لنکس دیے گئے ہیں\n\nاللہ حافظ! اگلی ویڈیو میں ملتے ہیں! 🤲`,
        },
        business: {
          hook: `السلام علیکم دوستو! کیا آپ ${topic || 'آن لائن پیسے کمانے'} کے بارے میں جاننا چاہتے ہیں؟ آج میں آپ کو وہ مکمل طریقہ بتاؤں گا جس سے آپ گھر بیٹھے اچھی خاصی آمدنی حاصل کر سکتے ہیں!`,
          content: `تو دوستو، آئیے شروع کرتے ہیں!\n\n💼 سب سے پہلے بات کرتے ہیں بنیادی باتوں کی:\n${topic || 'آن لائن بزنس'} شروع کرنے کے لیے آپ کو بس ایک لیپ ٹاپ اور انٹرنیٹ چاہیے۔ باقی سب میں آپ کو سکھاؤں گا۔\n\n💰 کتنا کما سکتے ہیں:\n- شروع میں: 30,000 سے 50,000 ماہانہ\n- 3 مہینے بعد: 1 لاکھ سے 2 لاکھ\n- 6 مہینے بعد: 3 لاکھ سے 5 لاکھ\n\n📋 مکمل اسٹیپ بائی اسٹیپ پلان:\n\nاسٹیپ 1: اکاؤنٹ بنائیں\nسب سے پہلے آپ کو اپنا اکاؤنٹ بنانا ہے۔ میں آپ کو دکھاتا ہوں...\n\nاسٹیپ 2: پروفائل سیٹ اپ کریں\nآپ کا پروفائل پروفیشنل ہونا چاہیے۔ یہ چیزیں ضرور شامل کریں...\n\nاسٹیپ 3: کلائنٹس تلاش کریں\nاب سب سے اہم حصہ - کلائنٹس کیسے ملیں گے...\n\nاسٹیپ 4: کام کریں اور پیسے وصول کریں\nکام مکمل کرنے کے بعد پیسے آپ کے اکاؤنٹ میں آ جائیں گے\n\n⚠️ اہم بات:\nصبر رکھیں - پہلے مہینے میں شاید زیادہ نہ کمائیں لیکن ہار نہ مانیں!`,
          cta: `تو دوستو، اگر آپ سنجیدگی سے ${topic || 'پیسے کمانا'} شروع کرنا چاہتے ہیں:\n\n👍 لائیک کریں اگر یہ ویڈیو مددگار رہی\n🔔 سبسکرائب کریں - میں ہر ہفتے نئی ویڈیو لاتا ہوں\n💬 کمنٹ کریں "شروع" اگر آپ آج سے شروع کرنا چاہتے ہیں\n🔗 ڈسکرپشن میں فری گائیڈ کا لنک ہے\n\nاللہ حافظ! 🤲`,
        },
        entertainment: {
          hook: `السلام علیکم دوستو! آج کی ویڈیو بہت مزیدار ہونے والی ہے! ہم بات کریں گے "${topic || 'پاکستان کے سب سے دلچسپ لمحات'}" کے بارے میں۔ تیار ہو جائیں کیونکہ ہنسی نہیں رُکے گی! 😂`,
          content: `تو دوستو، شروع کرتے ہیں!\n\n😂 نمبر 1:\nآپ یقین نہیں کریں گے کہ کیا ہوا جب...\n[مزاحیہ واقعہ بیان کریں]\n\n🤣 نمبر 2:\nاب یہ اور بھی مزیدار ہے...\n[اگلا واقعہ]\n\n😱 نمبر 3:\nبھائی یہ تو حد ہو گئی...\n[سب سے مزاحیہ واقعہ]\n\n💯 بونس:\nاور آخر میں وہ لمحہ جس کا سب کو انتظار تھا...\n[کلائمیکس]\n\nدوستو واقعی میں آج بہت مزہ آیا! آپ کو کیسی لگی یہ ویڈیو؟`,
          cta: `دوستو اگر آپ نے انجوائے کیا تو:\n\n❤️ لائیک ضرور کریں\n🔔 سبسکرائب اور بیل آئیکن آن کریں\n📤 دوستوں کو شیئر کریں\n💬 بتائیں کون سا حصہ سب سے زیادہ مزیدار تھا\n\nاگلی ویڈیو اور بھی دھماکے دار ہوگی! اللہ حافظ! 🤲`,
        },
      },
      en: {
        tech: {
          hook: `Hey everyone! Welcome back to the channel. Today we're diving deep into "${topic || 'the latest tech'}" that's absolutely changing the game in 2025. If you haven't heard about this yet, you're about to have your mind blown!`,
          content: `Let's get right into it!\n\n📌 What is ${topic || 'this technology'}?\nThis is a groundbreaking tool that's revolutionizing how we work. It's being adopted globally and the growth is exponential.\n\n📌 Key Benefits:\n1. Time Savings - Hours of work done in minutes\n2. Cost Effective - Free tier available\n3. Easy to Use - Anyone can learn it\n\n📌 Live Demo:\nLet me show you exactly how this works in real-time...\n[Screen share / Demo section]\n\n📌 My Personal Experience:\nI've been using this for 6 months and my productivity has tripled. You absolutely need to try this!\n\n📌 Common Mistakes to Avoid:\n- Don't use it without understanding the basics\n- Always customize your settings\n- Keep it updated regularly`,
          cta: `That's it for today's video!\n\n👍 Smash that like button if you learned something new\n🔔 Subscribe and hit the bell icon\n💬 Comment below which tool you use\n🔗 All links are in the description\n\nSee you in the next one! ✌️`,
        },
        business: {
          hook: `What's up everyone! Want to know how to ${topic || 'make money online'} in 2025? Today I'm sharing the exact blueprint that helped me build a profitable ${topic || 'online business'} from scratch!`,
          content: `Let's break this down step by step!\n\n💼 The Basics:\nTo start ${topic || 'your online business'}, all you need is a laptop and internet. I'll teach you everything else.\n\n💰 Earning Potential:\n- Month 1: $500 - $1,000\n- Month 3: $2,000 - $5,000\n- Month 6: $5,000 - $10,000+\n\n📋 Complete Step-by-Step Plan:\n\nStep 1: Create Your Account\nFirst, set up your account. Let me show you...\n\nStep 2: Optimize Your Profile\nYour profile needs to be professional. Include these elements...\n\nStep 3: Find Clients\nNow the most important part - how to find clients...\n\nStep 4: Deliver & Get Paid\nComplete the work and get paid directly to your account\n\n⚠️ Important Note:\nBe patient - you might not earn much in month one, but consistency is key!`,
          cta: `If you're serious about starting ${topic || 'your business journey'}:\n\n👍 Like this video if it was helpful\n🔔 Subscribe - I post new videos every week\n💬 Comment "START" if you're beginning today\n🔗 Free guide link in the description\n\nSee you next time! ✌️`,
        },
        entertainment: {
          hook: `Hey everyone! Today's video is going to be absolutely WILD! We're talking about "${topic || 'the craziest moments'}" and trust me, you are NOT ready for this! 😂`,
          content: `Let's jump right in!\n\n😂 Number 1:\nYou won't believe what happened when...\n[Describe funny moment]\n\n🤣 Number 2:\nThis one is even crazier...\n[Next moment]\n\n😱 Number 3:\nOkay this is absolutely insane...\n[Funniest moment]\n\n💯 Bonus:\nAnd finally, the moment everyone's been waiting for...\n[Climax]\n\nGuys, that was absolutely hilarious! What did you think?`,
          cta: `If you enjoyed this video:\n\n❤️ Smash that like button\n🔔 Subscribe and hit the bell\n📤 Share with your friends\n💬 Comment your favorite part\n\nNext video is going to be even crazier! See you there! ✌️`,
        },
      },
    },
  };

  const lang = isUrdu ? 'ur' : 'en';
  const cat = category || 'tech';
  const plat = isTikTok ? 'tiktok' : 'youtube';

  const script = scripts[plat]?.[lang]?.[cat] || scripts.tiktok.en.tech;

  res.json({
    platform: plat,
    language: lang,
    category: cat,
    topic: topic || 'General',
    duration: isTikTok ? '60 seconds' : '10 minutes',
    script: {
      hook: script.hook,
      content: script.content,
      cta: script.cta,
    },
    tips: isTikTok
      ? [
          'Keep energy HIGH from the start',
          'Use text overlays for key points',
          'Add trending sounds',
          'Post between 6-10 PM for best reach',
        ]
      : [
          'Start with a strong hook in first 30 seconds',
          'Add timestamps in description',
          'Use B-roll footage for engagement',
          'End with a clear call to action',
          'Optimal length: 8-12 minutes',
        ],
  });
};
