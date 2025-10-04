import { Button } from "@/components/ui/button";
import SkillCard from "@/components/SkillCard";
import CategoryCard from "@/components/CategoryCard";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Code2, 
  Palette, 
  Languages, 
  Briefcase, 
  Sparkles, 
  Users, 
  ArrowRight,
  BookOpen,
  Camera,
  Music,
  Calculator,
  Mic,
  Heart,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleBrowseSkills = () => {
    navigate('/skills');
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };
  const featuredSkills = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Master modern web technologies from experienced student developers",
      color: "from-primary to-secondary"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Learn creative design principles and industry-standard tools",
      color: "from-accent to-primary"
    },
    {
      icon: Languages,
      title: "Language Learning",
      description: "Practice languages with native and fluent student speakers",
      color: "from-secondary to-accent"
    },
    {
      icon: Briefcase,
      title: "Business Skills",
      description: "Develop entrepreneurial mindset and professional expertise",
      color: "from-primary to-accent"
    }
  ];

  const categories = [
    { icon: Code2, title: "Programming", count: "2,400+ students" },
    { icon: Palette, title: "Design", count: "1,800+ students" },
    { icon: Languages, title: "Languages", count: "3,200+ students" },
    { icon: Camera, title: "Photography", count: "950+ students" },
    { icon: Music, title: "Music", count: "1,200+ students" },
    { icon: Calculator, title: "Mathematics", count: "2,100+ students" },
    { icon: Mic, title: "Public Speaking", count: "850+ students" },
    { icon: BookOpen, title: "Writing", count: "1,500+ students" }
  ];

  const howItWorks = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and list the skills you want to learn and teach"
    },
    {
      number: "02",
      title: "Find Your Match",
      description: "Discover students with complementary skills to yours"
    },
    {
      number: "03",
      title: "Start Swapping",
      description: "Schedule sessions and begin your learning journey together"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <AnimatedBackground 
        type="blobs" 
        intensity={0.6}
        disableOnMobile={true}
      />
      
      {/* Cursor Follow Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(134, 239, 172, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-animated-gradient opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/95" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-glow">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join 10,000+ students learning together</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Block Learn:
              <br />
              Your Path to Skill Mastery
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              The revolutionary platform where students exchange knowledge. Learn what you need, teach what you know.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="xl" variant="hero" className="group" onClick={handleGetStarted}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="border-primary/30 hover:bg-primary/10" onClick={scrollToHowItWorks}>
                See How It Works
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>10k+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                <span>500+ Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <span>98% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the most popular skills students are teaching and learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredSkills.map((skill, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <SkillCard {...skill} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How It <span className="bg-gradient-secondary bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your skill-swapping journey in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="text-center p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground text-3xl font-bold mb-6 animate-float">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Popular <span className="bg-gradient-primary bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover thousands of students ready to share their expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Ready to Start Your
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Learning Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of students who are already exchanging skills and building their future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="hero" className="group" onClick={handleGetStarted}>
                Sign Up Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" className="border-secondary/30 hover:bg-secondary/10" onClick={handleBrowseSkills}>
                Browse Skills
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">SkillSwap</span>
            </div>
            <div className="flex gap-6 text-sm">
              <button onClick={handleGetStarted} className="text-muted-foreground hover:text-primary transition-colors">Sign Up</button>
              <button onClick={handleLogin} className="text-muted-foreground hover:text-primary transition-colors">Login</button>
              <button onClick={handleBrowseSkills} className="text-muted-foreground hover:text-primary transition-colors">Browse Skills</button>
              <button onClick={scrollToHowItWorks} className="text-muted-foreground hover:text-primary transition-colors">How It Works</button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SkillSwap. Empowering students worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
