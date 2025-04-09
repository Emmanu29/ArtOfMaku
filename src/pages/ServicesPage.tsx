import { motion } from 'framer-motion';
import { Palette, Pencil, Monitor, Users, Laptop, Camera } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Digital Illustrations",
      description: "Custom digital artworks perfect for personal use, social media, or print materials.",
      features: [
        "Character Illustrations",
        "Landscape Art",
        "Concept Art",
        "Fan Art"
      ],
      price: "Starting at ₱3,000"
    },
    {
      icon: <Pencil className="w-8 h-8" />,
      title: "Commission Artwork",
      description: "Personalized artwork created specifically to your requirements and preferences.",
      features: [
        "Portrait Commissions",
        "Custom Character Design",
        "Pet Portraits",
        "Family Illustrations"
      ],
      price: "Starting at ₱2,500"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Commercial Art",
      description: "Professional artwork for business and commercial purposes.",
      features: [
        "Logo Design",
        "Brand Illustrations",
        "Marketing Materials",
        "Social Media Assets"
      ],
      price: "Starting at ₱5,000"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Art Services
              </span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8">
              Transform your ideas into stunning digital artworks with our professional services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-700" />
                <div className="relative bg-zinc-900 p-8 rounded-xl h-full">
                  <div className="text-amber-400 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-4">{service.title}</h3>
                  <p className="text-zinc-400 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-zinc-400">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-amber-400 font-semibold">{service.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-zinc-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "1. Consultation",
                description: "Discuss your vision and requirements in detail"
              },
              {
                icon: <Laptop className="w-6 h-6" />,
                title: "2. Creation",
                description: "Development of your artwork with regular updates"
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: "3. Delivery",
                description: "Receive your finalized artwork in preferred formats"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/10 text-amber-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;