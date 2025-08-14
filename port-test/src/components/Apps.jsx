import { ChromeContent, VsCode, NotesContent } from "./AppsContent.jsx";
import ChromeIcon from "./assets/chrome.png";
import SpotifyIcon from "./assets/spotify.png";
import NotesIcon from "./assets/notes.png";

export const apps = [
    { id: "chrome", name: "Chrome", icon: ChromeIcon, content: <ChromeContent /> },
    { id: "vscode", name: "VS Code", icon: SpotifyIcon, content: <VsCode /> },
    { id: "notes", name: "Notes", icon: NotesIcon, content: <NotesContent /> }
];
