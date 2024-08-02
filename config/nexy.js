const headersConfig = () => {
  return [
      {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin allow-popups",
      },
      // Add more headers if needed
  ];
};

export default headersConfig;
