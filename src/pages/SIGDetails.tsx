import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Target, Lightbulb, Heart, Coins, Brain, Code, Mic, Book, Zap, TrendingUp, Puzzle, Rocket, Users2, GraduationCap, Award } from "lucide-react";

const SIG_DETAILS = {
  "soul-nurturing": {
    title: "Soul Nurturing",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-600",
    description: "A gentle space for reflection, balance and personal growth through mindful conversations and calming practices.",
    mission: "To nurture self-awareness, inner strength and a sense of peace by creating a space where individuals can pause, breathe, and reconnect with themselves beyond the noise of everyday life.",
    activities: [
      "Mindful conversations and discussions",
      "Calming practices and meditation sessions",
      "Personal growth workshops",
      "Reflection and journaling activities",
      "Wellness and mental health awareness programs"
    ],
    benefits: [
      "Enhanced self-awareness and mindfulness",
      "Improved emotional regulation and stress management",
      "Stronger sense of inner peace and balance",
      "Better understanding of personal values and goals",
      "Supportive community for personal growth"
    ],
    quote: "True growth begins from within, where a nurtured soul leads to a more fulfilling journey ahead."
  },
  "wealth-wire": {
    title: "Wealth Wire",
    icon: TrendingUp,
    color: "from-yellow-400 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600",
    description: "Empowering individuals with practical financial knowledge from budgeting to stock market fundamentals.",
    mission: "To promote financial awareness and empower individuals with practical financial knowledge that is simplified, accessible, and relevant to real-life decisions.",
    activities: [
      "Financial literacy workshops",
      "Budgeting and saving strategies",
      "Stock market and investment basics",
      "Personal finance management sessions",
      "Guest lectures from financial experts"
    ],
    benefits: [
      "Confidence in managing personal finances",
      "Understanding of investment opportunities",
      "Better budgeting and saving habits",
      "Knowledge of financial markets and trends",
      "Long-term financial planning skills"
    ],
    quote: "Understanding money is not just valuable, but essential for building a secure and independent future."
  },
  "ml-geeks": {
    title: "ML Geeks",
    icon: Puzzle,
    color: "from-blue-500 to-cyan-600",
    gradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600",
    description: "Fostering curiosity and building strong foundations in machine learning and artificial intelligence.",
    mission: "To cultivate curiosity and build strong foundations in machine learning and artificial intelligence through hands-on sessions, collaborative projects, and insightful discussions.",
    activities: [
      "Hands-on ML workshops and tutorials",
      "Collaborative AI projects",
      "Algorithm exploration and implementation",
      "Guest lectures from AI professionals",
      "Participation in ML competitions and hackathons"
    ],
    benefits: [
      "Strong foundation in ML concepts and algorithms",
      "Practical experience with AI tools and frameworks",
      "Problem-solving skills for ML challenges",
      "Understanding of emerging AI trends",
      "Portfolio of ML projects and accomplishments"
    ],
    quote: "Understanding machine learning is becoming essential to shaping the future."
  },
  "mind-marathon": {
    title: "Mind Marathon",
    icon: Puzzle,
    color: "from-purple-500 to-pink-600",
    gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-600",
    description: "Cultivating logical thinking, problem-solving abilities and mental agility through engaging challenges.",
    mission: "To cultivate logical thinking, problem-solving abilities, and mental agility through engaging activities, brain-teasing challenges, and interactive sessions.",
    activities: [
      "Logic puzzles and brain teasers",
      "Problem-solving workshops",
      "Critical thinking exercises",
      "Strategy games and competitions",
      "Mental agility training sessions"
    ],
    benefits: [
      "Enhanced logical reasoning and analytical skills",
      "Improved problem-solving capabilities",
      "Sharper focus and concentration",
      "Better decision-making abilities",
      "Increased mental flexibility and creativity"
    ],
    quote: "Sharpening the mind becomes just as important as gaining knowledge."
  },
  "tech-caffeine": {
    title: "Tech Caffeine",
    icon: Rocket,
    color: "from-green-500 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
    description: "Exploring and simplifying the latest technological trends shaping our world.",
    mission: "To explore, simplify, and connect the latest technological trends shaping our world, making innovation accessible and understandable to all.",
    activities: [
      "Tech trend discussions and presentations",
      "Emerging technology workshops",
      "Industry expert guest lectures",
      "Technology showcase events",
      "Hands-on sessions with new tools and platforms"
    ],
    benefits: [
      "Awareness of cutting-edge technologies",
      "Understanding of tech industry trends",
      "Practical experience with new tools",
      "Networking with tech professionals",
      "Future-ready skill development"
    ],
    quote: "Staying aligned with emerging trends is essential to remain relevant and future-ready."
  },
  "speak-to-lead": {
    title: "Speak to Lead",
    icon: Users2,
    color: "from-indigo-500 to-purple-600",
    gradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600",
    description: "Transforming communication into a powerful leadership skill through interactive sessions and practice.",
    mission: "To transform communication into a powerful leadership skill by creating an engaging space where individuals can find their voice, build presence, and express ideas with clarity and confidence.",
    activities: [
      "Public speaking workshops",
      "Leadership communication training",
      "Presentation skills development",
      "Debate and discussion sessions",
      "Confidence-building exercises"
    ],
    benefits: [
      "Improved public speaking abilities",
      "Enhanced leadership communication",
      "Greater confidence in expressing ideas",
      "Better presentation and persuasion skills",
      "Stronger personal presence and influence"
    ],
    quote: "The ability to communicate with confidence sets true leaders apart."
  },
  "paperback-pals": {
    title: "Paperback Pals",
    icon: GraduationCap,
    color: "from-teal-500 to-emerald-600",
    gradient: "bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600",
    description: "Bringing together book lovers and curious minds in a vibrant, idea-driven space.",
    mission: "To bring together book lovers and curious minds in a vibrant, idea-driven space where stories come alive, conversations flow, and reading turns into a shared experience.",
    activities: [
      "Book discussion groups",
      "Reading challenges and book clubs",
      "Author talks and literary events",
      "Creative writing workshops",
      "Literary analysis and interpretation sessions"
    ],
    benefits: [
      "Expanded reading horizons and perspectives",
      "Improved critical thinking through literature",
      "Enhanced communication through discussion",
      "Creative expression and writing skills",
      "Community of like-minded readers"
    ],
    quote: "Diving into a good book can spark imagination, fuel creativity and open doors to new perspectives."
  },
  "sps": {
    title: "Signal Processing Society",
    icon: Mic,
    color: "from-blue-600 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500",
    description: "Advancing and disseminating state-of-the-art scientific information in signal processing while providing a venue for people to interact and exchange ideas.",
    mission: "To advance and disseminate state-of-the-art scientific information and provide a venue for people to interact and exchange ideas in the signal processing domain.",
    activities: [
      "Specialized symposia on emerging technologies",
      "Signal processing workshops",
      "Technical seminars and webinars",
      "Collaborative research projects",
      "Member networking sessions"
    ],
    benefits: [
      "Access to high-quality signal processing resources",
      "Networking with experts in the field",
      "Opportunities for collaboration",
      "Stay updated with latest technical advancements",
      "Participation in specialized events"
    ],
    quote: "Enabling technology for the generation, transformation, and interpretation of information."
  },
  "cs": {
    title: "Computer Society",
    icon: Code,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-600",
    description: "Promoting education, research, and practical applications in computer science and technology to bridge the gap between academia and industry.",
    mission: "To promote education, research, and practical applications in computer science and technology, bridging the gap between academia and industry.",
    activities: [
      "Coding workshops and hackathons",
      "Computer science seminars",
      "Industry expert guest lectures",
      "Hands-on technology sessions",
      "Technical skill development programs"
    ],
    benefits: [
      "Access to cutting-edge technical resources",
      "Practical experience with industry tools",
      "Networking with tech professionals",
      "Empowerment for future tech leadership",
      "Collaborative innovation environment"
    ],
    quote: "Raising innovative minds to create a highly skilled workforce in the tech industry."
  },
  "sight": {
    title: "Special Interest Group on Humanitarian Technology",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600",
    description: "Leveraging technology for humanitarian causes and creating lasting, impactful change in underserved communities through engineering innovations.",
    mission: "To leverage technology for humanitarian causes and create lasting, impactful change in underserved communities by solving social issues through engineering innovations.",
    activities: [
      "Humanitarian technology projects",
      "Awareness programs on social issues",
      "Sustainable technology workshops",
      "Community outreach and engagement",
      "Partnerships for social impact"
    ],
    benefits: [
      "Hands-on experience in humanitarian projects",
      "Development of social responsibility",
      "Opportunity to create real-world impact",
      "Skill development in sustainable engineering",
      "Engagement in impactful social causes"
    ],
    quote: "To leverage technology for humanitarian causes and create lasting, impactful change."
  }
};

export default function SIGDetails() {
  const { id } = useParams();
  const sig = SIG_DETAILS[id as keyof typeof SIG_DETAILS];

  if (!sig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">SIG Not Found</h1>
          <p className="text-muted-foreground mt-2">The SIG you're looking for doesn't exist.</p>
          <Link to="/sigs" className="text-primary hover:underline mt-4 inline-block">
            ← Back to SIGs
          </Link>
        </div>
      </div>
    );
  }

  const Icon = sig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 ${sig.gradient} opacity-20`} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link 
              to="/sigs" 
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to SIGs
            </Link>
            
            <div className="flex justify-center mb-6">
              <div className={`${sig.gradient} w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-lg`}>
                <Icon className="w-10 h-10" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {sig.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {sig.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {sig.mission}
                </p>
              </motion.div>

              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-6">
                  <Calendar className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Activities</h2>
                </div>
                <ul className="space-y-3">
                  {sig.activities.map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-muted-foreground"
                    >
                      <div className={`w-2 h-2 rounded-full ${sig.gradient} mr-3`} />
                      {activity}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Benefits</h2>
                </div>
                <ul className="space-y-3">
                  {sig.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center text-muted-foreground"
                    >
                      <div className={`w-2 h-2 rounded-full ${sig.gradient} mr-3`} />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-8 border border-border/50"
              >
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-foreground">Inspiration</h3>
                </div>
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  "{sig.quote}"
                </blockquote>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border/50"
              >
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Quick Info</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-muted/40 border border-border/30">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Focus Area</span>
                    <span className="font-semibold text-foreground text-sm leading-snug">Personal &amp; Professional Growth</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-muted/40 border border-border/30">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meeting Frequency</span>
                    <span className="font-semibold text-foreground text-sm">Regular Sessions</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Open To</span>
                    <span className="font-semibold text-primary text-sm">All IEEE Members</span>
                  </div>
                </div>
              </motion.div>

              {/* Join CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 text-center border border-border/50"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Ready to Join?</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Become part of our growing community and start your journey with {sig.title}.
                </p>
                <Link
                  to="/join"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Join IEEE SOU SB
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related SIGs */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">Explore Other SIGs</h2>
            <p className="text-muted-foreground mt-2">Discover more ways to grow and develop your skills</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(SIG_DETAILS)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, relatedSig]) => {
                const RelatedIcon = relatedSig.icon;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`${relatedSig.gradient} w-10 h-10 rounded-xl flex items-center justify-center text-white mr-4`}>
                        <RelatedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{relatedSig.title}</h3>
                        <p className="text-sm text-muted-foreground">{relatedSig.description}</p>
                      </div>
                    </div>
                    <Link 
                      to={`/sigs/${key}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}