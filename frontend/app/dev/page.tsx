import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span className="font-bold">DesignMaestro</span>
        </div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Features</a>
          <a href="#" className="text-gray-400 hover:text-white">Macros</a>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Get Design Maestro
          </Button>
        </nav>
      </header>

      <main className="container mx-auto mt-20 space-y-32">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold">Boost your design productivity</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Design Maestro is a tool to boost your design workflow. Save time with our automated macros that you repeat hundreds of times daily.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full">
            Start for free
          </Button>
        </section>

        <section className="bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto">
          {/* Placeholder for the image/video of the tool interface */}
          <div className="bg-gray-800 h-64 rounded-lg"></div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Don't repeat yourself</h3>
            <p className="text-gray-400">Save time on repetitive tasks, boosting efficiency.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Shortcut to a better productivity</h3>
            <p className="text-gray-400">Streamline your workflow with powerful shortcuts.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Rich collection of handy macros</h3>
            <p className="text-gray-400">Access a wide range of pre-built macros for various tasks.</p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Macros for busy designers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded">NEW</span>
                    <h3 className="text-lg font-semibold mt-2">Macro Name</h3>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mb-4">Short description of the macro and its benefits.</p>
                <Button variant="link" className="text-blue-400 p-0">
                  View preview
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">How does it work?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Install Keyboard Maestro</h3>
              <p className="text-gray-400">Download and install the Keyboard Maestro app on your Mac.</p>
            </div>
            <div>
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Install Design Macros</h3>
              <p className="text-gray-400">Import our curated collection of design macros into Keyboard Maestro.</p>
            </div>
            <div>
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Start using the macros</h3>
              <p className="text-gray-400">Boost your productivity with our time-saving macros.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Design Maestro</h2>
          <p className="text-gray-400 mb-6">Start boosting your design workflow with our macros.</p>
          <div className="flex justify-center items-center space-x-4">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get started for free
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Question {i}?</h3>
                <p className="text-gray-400">Answer to the frequently asked question goes here, providing clear and concise information to address common concerns or inquiries.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-8 mt-32 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2023 Design Maestro. All rights reserved.</p>
      </footer>
    </div>
  )
}