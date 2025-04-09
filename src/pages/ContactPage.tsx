import { useState, useRef } from 'react';
import { AtSignIcon, MapPinIcon, SendIcon, Palette, Globe, Calendar } from 'lucide-react';

const ContactPage = () => {
  const [result, setResult] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "3effd803-43e3-4181-a297-3b852a15d532");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult("Thank you! Your message has been sent successfully.");
        // Use the ref to reset the form
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        console.log("Error", data);
        setResult("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("An error occurred. Please try again later.");
    }
    
    setTimeout(() => {
      setResult("");
    }, 5000);
  };
  
  return (
    <div className="w-full bg-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Contact
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-zinc-400 mb-8">
                Interested in commissioning artwork, collaborating on a project,
                or just want to say hello? Fill out the form or reach out
                through the contact information provided.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber-400/20 p-3 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <AtSignIcon className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400">markgerard75@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-400/20 p-3 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <MapPinIcon className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Location</h3>
                    <p className="text-gray-400">Paniqui, Tarlac</p>
                  </div>
                </div>
                {/* Commission Status */}
                <div className="flex items-start">
                  <div className="bg-amber-400/20 p-3 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Palette className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Commission Status</h3>
                    <p className="text-gray-400">Currently Available</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-start">
                  <div className="bg-amber-400/20 p-3 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <Globe className="text-amber-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Languages</h3>
                    <p className="text-gray-400">English, Filipino</p>
                  </div>
                </div>              
              </div>
            </div>
            <div className="bg-zinc-800 rounded-lg p-8">
              <form ref={formRef} onSubmit={onSubmit}>
                {/* Hidden honeypot field to prevent spam */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-3 px-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-3 px-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
                    placeholder="Enter your email" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-3 px-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
                    placeholder="Subject of your message" 
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-3 px-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none" 
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                {/* Status message */}
                {result && (
                  <div className={`mb-4 p-3 rounded-md ${result.includes("success") ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>
                    {result}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
                >
                  Send Message <SendIcon size={18} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;