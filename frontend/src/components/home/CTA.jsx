import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-primary rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-200">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-dark rounded-full opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10 px-8 py-4 md:py-8 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
              <Sparkles size={16} className="text-blue-100" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Limited Availability
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-6">
              Ready for a More Personal <br className="hidden md:block" /> Stay
              Experience?
            </h2>

            <p className="text-blue-100 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              With only 6 exclusive rooms, our residence fills up fast. Secure
              your private sanctuary in the city today.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/rooms"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group"
              >
                Book Your Room{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Contact Support
              </Link>
            </div>

            {/* Trust Footer */}
            <p className="mt-8 text-blue-200 text-xs font-medium uppercase tracking-tighter opacity-80">
              No hidden fees • Instant Confirmation • Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
