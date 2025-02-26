export const displayFancyLogs = () => {
  console.log(
    "%c  __  __    _    _   _ _____ ____  _   _ \n |  \\/  |  / \\  | | | | ____/ ___|| | | |\n | |\\/| | / _ \\ | |_| |  _| \\___ \\| |_| |\n | |  | |/ ___ \\|  _  | |___ ___) |  _  |\n |_|  |_/_/   \\_\\_| |_|_____|____/|_| |_|\n",
    "color: #6b17e8;"
  );

  console.log(
    "%c Hope you like what you see :)",
    "color: #6b17e8; padding: 6px;"
  );

  // Easter egg hint
  console.log(
    "%c 💡 Psst! There's a secret hiding in plain sight. Follow your heart, it might lead to something... interesting.",
    "color: #6b17e8; font-style: italic; padding: 6px;"
  );
};
