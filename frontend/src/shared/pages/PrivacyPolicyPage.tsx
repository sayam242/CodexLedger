import { useNavigate } from "react-router-dom";
import { Code, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-br from-background via-background to-muted min-h-screen">
            {/* Header */}
            <header className="py-6 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 text-lg font-bold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Code className="bg-black text-white px-1 rounded" size={24} />
                        <span>CodexLedger</span>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="py-12 px-6">
                <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p className="text-sm text-muted-foreground">Last Updated: July 11, 2026</p>

                    <p>
                        CodexLedger (&ldquo;the Extension&rdquo;) is committed to protecting your privacy. This Privacy Policy explains what information is collected, how it is used, and how it is protected.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>CodexLedger may collect the following information to provide its functionality:</p>
                    <ul>
                        <li>Google account information (such as your name, email address, and profile picture) when you sign in using Google Authentication.</li>
                        <li>Coding problem information from supported coding platforms (currently LeetCode), including problem details, submissions, programming language, and related metadata.</li>
                        <li>Personal notes created by you within the extension.</li>
                        <li>Extension preferences and settings stored locally in your browser.</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>The collected information is used solely to:</p>
                    <ul>
                        <li>Authenticate your account.</li>
                        <li>Synchronize your coding history across devices.</li>
                        <li>Store and organize coding problems and submissions.</li>
                        <li>Save and retrieve your personal notes.</li>
                        <li>Provide AI-powered learning and productivity features.</li>
                        <li>Improve your learning and revision experience.</li>
                    </ul>

                    <h2>AI Features</h2>
                    <p>
                        Some features may use Generative AI to provide explanations, summaries, or learning assistance. Only the information necessary to generate these responses is transmitted to our backend or AI service providers.
                    </p>

                    <h2>Data Storage</h2>
                    <p>Your information may be stored:</p>
                    <ul>
                        <li>Locally within your browser using Chrome Extension Storage.</li>
                        <li>Securely on CodexLedger servers to synchronize your account and coding history.</li>
                    </ul>

                    <h2>Data Sharing</h2>
                    <p>
                        CodexLedger does not sell, rent, or trade your personal information. Your information is shared only when necessary to provide core functionality, such as authentication or AI-powered features.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        Reasonable administrative and technical measures are implemented to protect user data from unauthorized access, modification, or disclosure.
                    </p>

                    <h2>Third-Party Services</h2>
                    <p>CodexLedger currently uses services including:</p>
                    <ul>
                        <li>Google Authentication</li>
                        <li>Firebase Authentication (if applicable)</li>
                        <li>OpenAI or other AI providers (for AI-powered features)</li>
                    </ul>
                    <p>These services have their own privacy policies governing their handling of data.</p>

                    <h2>Your Rights</h2>
                    <p>
                        You may request deletion of your account and associated data by contacting us.
                    </p>

                    <h2>Children&rsquo;s Privacy</h2>
                    <p>
                        CodexLedger is not intended for children under the age required by applicable law without parental consent.
                    </p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        This Privacy Policy may be updated periodically. Changes will be reflected by updating the &ldquo;Last Updated&rdquo; date.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        For questions regarding this Privacy Policy, please contact:<br />
                        Email: <a href="mailto:11s3sayam31@gmail.com">11s3sayam31@gmail.com</a>
                    </p>
                </div>
            </main>
        </div>
    );
}
