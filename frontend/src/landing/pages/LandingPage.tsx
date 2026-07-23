import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Code,
    BarChart3,
    FileCode2,
    Zap,
    Target,
    TrendingUp,
    Download,
    ChevronRight,

    ArrowRight,
    Sparkles,
    Brain,
    Trophy
} from "lucide-react";

const QUOTES = [
    { text: "Every expert was once a beginner.", author: "Helen Hayes" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
];

const FEATURES = [
    {
        icon: BarChart3,
        title: "Track Every Submission",
        description: "Automatically log every problem you solve across platforms. Never lose track of your progress again.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: Target,
        title: "Visualize Progress",
        description: "Beautiful heatmaps, trend charts, and analytics that reveal your coding patterns and growth.",
        color: "from-purple-500 to-pink-400"
    },
    {
        icon: Brain,
        title: "Identify Weaknesses",
        description: "Topic-wise breakdown shows exactly where to focus. Turn your weaknesses into strengths.",
        color: "from-orange-500 to-red-400"
    },
    {
        icon: TrendingUp,
        title: "Stay Consistent",
        description: "Daily streaks and weekly goals keep you accountable. Consistency is the key to mastery.",
        color: "from-green-500 to-emerald-400"
    },
    {
        icon: FileCode2,
        title: "Organize Solutions",
        description: "Store your code, add notes, and build a personal knowledge base of problem-solving patterns.",
        color: "from-pink-500 to-rose-400"
    },
    {
        icon: Trophy,
        title: "Celebrate Milestones",
        description: "Track your journey from 0 to 1000 problems. Every solved problem is a step forward.",
        color: "from-yellow-500 to-amber-400"
    }
];

const STATS = [
    { value: "10K+", label: "Problems Tracked" },
    { value: "500+", label: "Active Coders" },
    { value: "50K+", label: "Submissions Logged" },
    { value: "98%", label: "Love Rate" },
];

export default function LandingPage() {
    const navigate = useNavigate();
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/100 backdrop-blur-lg border-b border-border">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                        <Code className="bg-black text-white px-1 rounded" size={32} />
                        <span>CodexLedger</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative">
                    <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 text-yellow-500" />
                            <span>Track. Analyze. Improve.</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Your Coding Journey{" "}
                            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Visualized
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            The ultimate platform to track, analyze, and improve your problem-solving skills.
                            Never lose sight of your progress.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <button
                                onClick={() => window.open("https://microsoftedge.microsoft.com/addons/detail/codexledger/gkenpcmnoanajgdaieijnkimjdjomibe", "_blank")}
                                className="group bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                <Download className="h-5 w-5" />
                                Download Extension
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                        </div>

                        {/* Motivational Quote */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 max-w-2xl mx-auto border border-gray-100 dark:border-gray-800">
                            <p className="text-lg italic text-muted-foreground mb-2">
                                "{QUOTES[quoteIndex].text}"
                            </p>
                            <p className="text-sm text-muted-foreground/70">
                                — {QUOTES[quoteIndex].author}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section
            <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Everything You Need to{" "}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Level Up
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Powerful features designed to help you track progress, identify patterns,
                            and accelerate your growth as a programmer.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Get Started in{" "}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                3 Simple Steps
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Install Extension",
                                description: "Add CodexLedger to Chrome. It takes just 10 seconds."
                            },
                            {
                                step: "02",
                                title: "Solve Problems",
                                description: "Code on LeetCode, CodeForces, or any platform. We track automatically."
                            },
                            {
                                step: "03",
                                title: "View Dashboard",
                                description: "See beautiful analytics, heatmaps, and insights about your progress."
                            }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials / Quotes Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Words That{" "}
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                Inspire
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Let the greatest minds fuel your journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {QUOTES.slice(0, 4).map((quote, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800"
                            >
                                <p className="text-sm italic mb-4">"{quote.text}"</p>
                                <p className="text-xs text-muted-foreground">— {quote.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Zap className="h-12 w-12 mx-auto mb-6 text-yellow-400" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Transform Your Coding Journey?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are already tracking, analyzing,
                        and improving their problem-solving skills.
                    </p>
                    <button
                        onClick={() => window.open("https://microsoftedge.microsoft.com/addons/detail/codexledger/gkenpcmnoanajgdaieijnkimjdjomibe", "_blank")}
                        className="group bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                        <Download className="h-5 w-5" />
                        Download Free Extension
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-sm text-gray-400 mt-4">
                        Free forever. No credit card required.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-lg font-bold">
                        <Code className="bg-black text-white px-1 rounded" size={24} />
                        <span>CodexLedger</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Built with passion for the coding community.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
