// di dalam file "../icons/IconBenefit.js"
export function Awareness({ className }) {
  return (
    <div className={`w-40 h-40 mb-4 text-[#1D493C] ${className}`}>
      <img src="aware.png" alt="Awareness Icon" />
    </div>
  );
}

// Lakukan hal yang sama untuk komponen Manage, Build, dan Become
export function Manage({ className }) {
  return (
    <div className={`w-40 h-40 mb-4 ${className}`}>
      <img src="manage.png" alt="Manage Icon" />
    </div>
  );
}

// ...dan seterusnya
export function Build({ className }) {
  return (
    <div className={`w-40 h-40 mb-4 ${className}`}>
      <img src="build.png" alt="Build Icon" />
    </div>
  );
}

export function Become({ className }) {
  return (
    <div className={`w-40 h-40 mb-4 ${className}`}>
      <img src="become.png" alt="Become Icon" />
    </div>
  );
}

export default function IconBenefit() {
  return (
    <div>
      <Awareness />
      <Manage />
      <Build />
      <Become />
    </div>
  );
}
