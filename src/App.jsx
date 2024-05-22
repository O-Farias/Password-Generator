import { useState, useEffect } from "react";
import { FaCopy, FaCheck, FaLock, FaTrash } from "react-icons/fa";
import Particles from "react-tsparticles";
import "tailwindcss/tailwind.css";

function App() {
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copiar");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [history, setHistory] = useState([]);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("passwordHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("passwordHistory", JSON.stringify(history));
  }, [history]);

  function generate() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let characters = lowercase;

    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const position = Math.floor(Math.random() * characters.length);
      newPassword += characters[position];
    }
    setPassword(newPassword);
    setCopyText("Copiar");
    checkPasswordStrength(newPassword);
    addToHistory(newPassword);
  }

  function checkPasswordStrength(password) {
    let strength = "";
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passedCriteria = [
      lengthCriteria,
      uppercaseCriteria,
      numberCriteria,
      symbolCriteria,
    ].filter(Boolean).length;

    if (passedCriteria <= 1) {
      strength = "Fraca";
    } else if (passedCriteria === 2) {
      strength = "Média";
    } else if (passedCriteria >= 3) {
      strength = "Forte";
    }

    setPasswordStrength(strength);
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyText("Copiado!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function addToHistory(newPassword) {
    setHistory([newPassword, ...history]);
  }

  function clearHistory() {
    setHistory([]);
  }

  const particlesOptions = {
    background: {
      color: {
        value: "#1a202c",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#48d1cc",
      },
      links: {
        color: "#8ad6d3",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: particleCount, // Usando o estado para o número de partículas
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  function handleBackgroundClick(event) {
    if (event.target === event.currentTarget) {
      setParticleCount(particleCount + 5);
    }
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen text-gray-100"
      onClick={handleBackgroundClick}
    >
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0"
      />
      <div className="bg-gray-700 p-6 rounded shadow-lg w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <FaLock className="text-4xl text-blue-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-200 text-center">
          Gerador de Senhas
        </h1>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">
            Comprimento da Senha
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
          <span className="block text-center mt-2 text-gray-300">{length}</span>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2"
            />
            Incluir Letras Maiúsculas
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2"
            />
            Incluir Números
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2"
            />
            Incluir Símbolos
          </label>
        </div>
        <button
          onClick={generate}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Gerar Senha
        </button>
        {password && (
          <div className="mt-4">
            <div className="p-2 bg-gray-600 rounded flex justify-between items-center">
              <span className="text-gray-100">{password}</span>
              <button onClick={copyToClipboard} className="text-gray-300 ml-4">
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
            <div className="mt-2 text-center">
              <span
                className={`font-medium ${
                  passwordStrength === "Forte"
                    ? "text-green-500"
                    : passwordStrength === "Média"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Força da Senha: {passwordStrength}
              </span>
            </div>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-200 mb-2">
            Histórico de Senhas
          </h2>
          <ul className="bg-gray-600 p-4 rounded max-h-40 overflow-y-auto">
            {history.length === 0 && (
              <li className="text-gray-400">Nenhuma senha gerada.</li>
            )}
            {history.map((item, index) => (
              <li key={index} className="text-gray-300">
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={clearHistory}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
          >
            <FaTrash className="mr-2" /> Limpar Histórico
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
