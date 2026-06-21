import { useEffect, useMemo, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import {
    FaBell,
    FaBookmark,
    FaBriefcase,
    FaCalendarAlt,
    FaCamera,
    FaCheck,
    FaCommentDots,
    FaEllipsisH,
    FaGamepad,
    FaGift,
    FaGlobeAmericas,
    FaHeart,
    FaHome,
    FaImage,
    FaLaughSquint,
    FaLock,
    FaMapMarkerAlt,
    FaMoon,
    FaPaperPlane,
    FaPlayCircle,
    FaPlus,
    FaSadTear,
    FaSearch,
    FaShare,
    FaShieldAlt,
    FaStore,
    FaSun,
    FaThumbsUp,
    FaTimes,
    FaUserCheck,
    FaUserFriends,
    FaUserPlus,
    FaUsers,
    FaVideo,
} from "react-icons/fa";

const APP_NAME = "MitraLink";
const STORAGE_KEY = "mitralink-social-state-v2";

type ViewKey = "home" | "friends" | "watch" | "marketplace" | "groups" | "events" | "gaming" | "saved" | "profile" | "memories";
type Privacy = "Public" | "Friends" | "Only me";
type Reaction = "like" | "love" | "haha" | "sad";
type AuthMode = "login" | "signup" | "forgot";

type Person = {
    id: number;
    name: string;
    role: string;
    city: string;
    avatar: string;
    cover: string;
    online?: boolean;
    mutual?: number;
};

type Comment = {
    id: number;
    author: string;
    avatar: string;
    text: string;
};

type Post = {
    id: number;
    author: Person;
    time: string;
    privacy: Privacy;
    text: string;
    image?: string;
    location?: string;
    liked: boolean;
    saved: boolean;
    reaction?: Reaction;
    reactions: Record<Reaction, number>;
    comments: Comment[];
    shares: number;
};

type Message = {
    id: number;
    from: "me" | "them";
    text: string;
};

type AppState = {
    posts: Post[];
    friends: Person[];
    requests: Person[];
    messages: Message[];
};

const me: Person = {
    id: 1,
    name: "Chiranjibi Debkota",
    role: "React Developer",
    city: "Kathmandu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    cover: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    online: true,
};

const people: Person[] = [
    {
        id: 2,
        name: "Aarav Sharma",
        role: "Product Designer",
        city: "Lalitpur",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 18,
    },
    {
        id: 3,
        name: "Maya Thapa",
        role: "Community Lead",
        city: "Pokhara",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 42,
    },
    {
        id: 4,
        name: "Nisha Gurung",
        role: "Photographer",
        city: "Bhaktapur",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        mutual: 12,
    },
    {
        id: 5,
        name: "Samir Rai",
        role: "Startup Founder",
        city: "Biratnagar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 27,
    },
    {
        id: 6,
        name: "Elina Karki",
        role: "Travel Creator",
        city: "Chitwan",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        mutual: 31,
    },
    {
        id: 7,
        name: "Roshan Bista",
        role: "Frontend Mentor",
        city: "Dharan",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
        cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        online: true,
        mutual: 35,
    },
];

const initialPosts: Post[] = [
    {
        id: 101,
        author: people[1],
        time: "8 min",
        privacy: "Public",
        text: "Finished planning the Kathmandu community meetup. React talks, design critique, and plenty of coffee are officially on the board.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        location: "Kathmandu, Nepal",
        liked: false,
        saved: false,
        reactions: { like: 126, love: 34, haha: 8, sad: 0 },
        comments: [
            { id: 1, author: people[0].name, avatar: people[0].avatar, text: "Count me in!" },
            { id: 2, author: people[3].name, avatar: people[3].avatar, text: "Please save one seat for me." },
        ],
        shares: 14,
    },
    {
        id: 102,
        author: people[2],
        time: "34 min",
        privacy: "Friends",
        text: "A quiet morning shoot turned into my favorite set of the month. The city looks different when everyone else is still waking up.",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
        location: "Nagarkot",
        liked: true,
        saved: true,
        reaction: "love",
        reactions: { like: 91, love: 58, haha: 2, sad: 0 },
        comments: [
            { id: 3, author: people[1].name, avatar: people[1].avatar, text: "This frame is beautiful." },
            { id: 4, author: people[4].name, avatar: people[4].avatar, text: "Your color grading is getting so good." },
        ],
        shares: 9,
    },
    {
        id: 103,
        author: people[3],
        time: "1 hr",
        privacy: "Public",
        text: "Shipping a new landing page today. The best product work still feels like listening carefully, then removing everything that does not help.",
        liked: false,
        saved: false,
        reactions: { like: 211, love: 37, haha: 3, sad: 1 },
        comments: [{ id: 5, author: people[5].name, avatar: people[5].avatar, text: "That last line belongs on a poster." }],
        shares: 22,
    },
];

const defaultState: AppState = {
    posts: initialPosts,
    friends: people.slice(0, 4),
    requests: people.slice(4),
    messages: [
        { id: 1, from: "them", text: "Are you joining the meetup?" },
        { id: 2, from: "me", text: "Yes, I am finishing the demo today." },
    ],
};

const reactionMeta: Record<Reaction, { label: string; icon: ReactElement; color: string; bg: string }> = {
    like: { label: "Like", icon: <FaThumbsUp />, color: "text-[#0f9f8f]", bg: "bg-[#0f9f8f]" },
    love: { label: "Love", icon: <FaHeart />, color: "text-rose-600", bg: "bg-rose-500" },
    haha: { label: "Haha", icon: <FaLaughSquint />, color: "text-amber-500", bg: "bg-amber-400" },
    sad: { label: "Sad", icon: <FaSadTear />, color: "text-orange-500", bg: "bg-orange-400" },
};

const mainNav: Array<{ key: ViewKey; label: string; icon: ReactElement }> = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "friends", label: "Friends", icon: <FaUserFriends /> },
    { key: "watch", label: "Watch", icon: <FaPlayCircle /> },
    { key: "marketplace", label: "Market", icon: <FaStore /> },
    { key: "groups", label: "Groups", icon: <FaUsers /> },
];

const sideNav: Array<{ key: ViewKey; label: string; icon: ReactElement }> = [
    { key: "memories", label: "Memories", icon: <FaGift /> },
    { key: "saved", label: "Saved", icon: <FaBookmark /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "gaming", label: "Gaming", icon: <FaGamepad /> },
    { key: "profile", label: "Profile", icon: <FaCamera /> },
];

const marketplace = [
    { title: "MacBook Pro M2", price: "$1,120", area: "Kathmandu", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80" },
    { title: "City Bicycle", price: "$180", area: "Lalitpur", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80" },
    { title: "Studio Chair", price: "$65", area: "Bhaktapur", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=500&q=80" },
    { title: "Sony Camera", price: "$430", area: "Pokhara", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
];

const videoCards = [
    "Creator studio live: responsive design teardown",
    "Kathmandu food walk highlights",
    "Build a React chat panel from scratch",
];

function loadState(): AppState {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return defaultState;
        return { ...defaultState, ...JSON.parse(stored) } as AppState;
    } catch {
        return defaultState;
    }
}

function privacyIcon(privacy: Privacy) {
    if (privacy === "Public") return <FaGlobeAmericas />;
    if (privacy === "Only me") return <FaLock />;
    return <FaUserFriends />;
}

function totalReactions(post: Post) {
    return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
}

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState<ViewKey>("home");
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [state, setState] = useState<AppState>(() => loadState());
    const [postText, setPostText] = useState("");
    const [postPrivacy, setPostPrivacy] = useState<Privacy>("Friends");
    const [query, setQuery] = useState("");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [messengerOpen, setMessengerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<Person>(people[0]);
    const [messageText, setMessageText] = useState("");
    const [credentials, setCredentials] = useState({ email: "", password: "", firstName: "", lastName: "", birthday: "", gender: "Custom" });

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const filteredPosts = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return state.posts;
        return state.posts.filter((post) => {
            return (
                post.text.toLowerCase().includes(term) ||
                post.author.name.toLowerCase().includes(term) ||
                post.location?.toLowerCase().includes(term)
            );
        });
    }, [state.posts, query]);

    const savedPosts = state.posts.filter((post) => post.saved);
    const viewTitle = [...mainNav, ...sideNav].find((item) => item.key === activeView)?.label ?? "Home";
    const shellTone = darkMode ? "bg-[#18191a] text-[#e4e6eb]" : "bg-[#f0f2f5] text-[#1c1e21]";
    const cardTone = darkMode ? "bg-[#242526] border-white/10" : "bg-white border-black/5";
    const mutedTone = darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]";

    function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (authMode === "forgot") {
            setAuthMode("login");
            return;
        }
        setIsLoggedIn(true);
    }

    function createPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const cleanText = postText.trim();
        if (!cleanText) return;

        const newPost: Post = {
            id: Date.now(),
            author: me,
            time: "now",
            privacy: postPrivacy,
            text: cleanText,
            liked: false,
            saved: false,
            reactions: { like: 0, love: 0, haha: 0, sad: 0 },
            comments: [],
            shares: 0,
        };

        setState((current) => ({ ...current, posts: [newPost, ...current.posts] }));
        setPostText("");
        setActiveView("home");
    }

    function reactToPost(postId: number, reaction: Reaction) {
        setState((current) => ({
            ...current,
            posts: current.posts.map((post) => {
                if (post.id !== postId) return post;
                const nextReactions = { ...post.reactions };
                if (post.reaction === reaction) {
                    nextReactions[reaction] = Math.max(0, nextReactions[reaction] - 1);
                    return { ...post, liked: false, reaction: undefined, reactions: nextReactions };
                }
                if (post.reaction) {
                    nextReactions[post.reaction] = Math.max(0, nextReactions[post.reaction] - 1);
                }
                nextReactions[reaction] += 1;
                return { ...post, liked: true, reaction, reactions: nextReactions };
            }),
        }));
    }

    function toggleSave(postId: number) {
        setState((current) => ({
            ...current,
            posts: current.posts.map((post) => (post.id === postId ? { ...post, saved: !post.saved } : post)),
        }));
    }

    function sharePost(postId: number) {
        setState((current) => ({
            ...current,
            posts: current.posts.map((post) => (post.id === postId ? { ...post, shares: post.shares + 1 } : post)),
        }));
    }

    function addComment(postId: number, text: string) {
        const cleanText = text.trim();
        if (!cleanText) return;
        const comment: Comment = { id: Date.now(), author: me.name, avatar: me.avatar, text: cleanText };
        setState((current) => ({
            ...current,
            posts: current.posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post)),
        }));
    }

    function acceptFriend(person: Person) {
        setState((current) => ({
            ...current,
            friends: [person, ...current.friends],
            requests: current.requests.filter((request) => request.id !== person.id),
        }));
    }

    function removeRequest(personId: number) {
        setState((current) => ({ ...current, requests: current.requests.filter((request) => request.id !== personId) }));
    }

    function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const cleanMessage = messageText.trim();
        if (!cleanMessage) return;
        setState((current) => ({
            ...current,
            messages: [...current.messages, { id: Date.now(), from: "me", text: cleanMessage }],
        }));
        setMessageText("");
    }

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-[#eef3f2] px-4 py-8 text-[#1c1e21] sm:px-6">
                <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="text-center lg:text-left">
                        <BrandMark size="large" />
                        <h1 className="mt-4 text-5xl font-bold tracking-normal text-[#0f9f8f] sm:text-6xl">{APP_NAME}</h1>
                        <p className="mx-auto mt-4 max-w-xl text-2xl leading-tight lg:mx-0">
                            Connect with friends, communities, videos, groups, and local finds in one social home.
                        </p>
                        <div className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-3 lg:mx-0">
                            {[
                                ["Real feed", "Post, react, comment, save, and share."],
                                ["Messenger", "Chat panel with live local state."],
                                ["Responsive", "Desktop, tablet, and mobile layouts."],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-lg bg-white/80 p-4 shadow-sm">
                                    <strong className="block text-[#0f9f8f]">{title}</strong>
                                    <span className="text-sm text-gray-600">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <AuthCard
                        mode={authMode}
                        credentials={credentials}
                        setCredentials={setCredentials}
                        setMode={setAuthMode}
                        onSubmit={handleAuthSubmit}
                    />
                </section>
            </main>
        );
    }

    return (
        <main className={cx("min-h-screen pb-16 md:pb-0", shellTone)}>
            <header className={cx("sticky top-0 z-40 flex h-14 items-center justify-between border-b px-2 shadow-sm sm:px-4", cardTone)}>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <button className="shrink-0" onClick={() => setActiveView("home")} aria-label={`${APP_NAME} home`}>
                        <BrandMark />
                    </button>
                    <label className={cx("hidden h-10 max-w-[280px] flex-1 items-center gap-2 rounded-full px-4 md:flex", mutedTone)}>
                        <FaSearch className="text-gray-500" />
                        <input
                            className="w-full bg-transparent text-sm outline-none"
                            placeholder={`Search ${APP_NAME}`}
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </label>
                </div>

                <nav className="hidden h-full flex-1 justify-center gap-1 md:flex">
                    {mainNav.map((item) => (
                        <NavIcon key={item.key} item={item} active={activeView === item.key} darkMode={darkMode} onClick={() => setActiveView(item.key)} />
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <button className={cx("flex h-10 w-10 items-center justify-center rounded-full", mutedTone)} onClick={() => setMenuOpen(true)} aria-label="Open menu">
                        <FaEllipsisH />
                    </button>
                    <button className={cx("hidden h-10 w-10 items-center justify-center rounded-full sm:flex", mutedTone)} onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <HeaderBubble count={3} darkMode={darkMode} onClick={() => setMessengerOpen((value) => !value)}>
                        <FaCommentDots />
                    </HeaderBubble>
                    <HeaderBubble count={5} darkMode={darkMode} onClick={() => setNotificationsOpen((value) => !value)}>
                        <FaBell />
                    </HeaderBubble>
                    <button className="flex items-center gap-2 rounded-full px-1.5 py-1 transition hover:bg-black/5" onClick={() => setActiveView("profile")}>
                        <img src={me.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                        <span className="hidden text-sm font-semibold xl:block">Chiranjibi</span>
                    </button>
                </div>
            </header>

            <section className="mx-auto grid max-w-[1460px] grid-cols-1 gap-4 px-2 py-4 sm:px-4 lg:grid-cols-[280px_minmax(0,680px)] xl:grid-cols-[300px_minmax(0,700px)_330px]">
                <aside className="hidden lg:block">
                    <div className="sticky top-[72px] space-y-1">
                        <SidePerson person={me} active={activeView === "profile"} onClick={() => setActiveView("profile")} />
                        {[...mainNav, ...sideNav].map((item) => (
                            <SideNavItem key={item.key} item={item} active={activeView === item.key} darkMode={darkMode} onClick={() => setActiveView(item.key)} />
                        ))}
                        <Panel darkMode={darkMode} title="Shortcuts">
                            {["React Nepal", "Kathmandu Creators", "Frontend Career Club"].map((item) => (
                                <button key={item} className="flex w-full items-center gap-3 rounded-md p-2 text-left text-sm font-semibold hover:bg-black/5">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#dff8f4] text-[#0f9f8f]"><FaUsers /></span>
                                    {item}
                                </button>
                            ))}
                        </Panel>
                    </div>
                </aside>

                <section className="mx-auto w-full max-w-[700px] space-y-4">
                    <label className={cx("flex h-11 items-center gap-2 rounded-full px-4 md:hidden", mutedTone)}>
                        <FaSearch className="text-gray-500" />
                        <input className="w-full bg-transparent text-sm outline-none" placeholder={`Search ${APP_NAME}`} value={query} onChange={(event) => setQuery(event.target.value)} />
                    </label>

                    {activeView === "home" && (
                        <>
                            <Stories darkMode={darkMode} onCreate={() => setPostText("Today I am sharing...")} />
                            <Composer darkMode={darkMode} postText={postText} privacy={postPrivacy} setPostText={setPostText} setPrivacy={setPostPrivacy} onSubmit={createPost} />
                            {filteredPosts.length ? (
                                filteredPosts.map((post) => (
                                    <PostCard key={post.id} post={post} darkMode={darkMode} onReact={reactToPost} onComment={addComment} onShare={sharePost} onSave={toggleSave} />
                                ))
                            ) : (
                                <EmptyState darkMode={darkMode} title="No posts found" text="Try a different search term." />
                            )}
                        </>
                    )}

                    {activeView !== "home" && (
                        <FeatureView
                            title={viewTitle}
                            activeView={activeView}
                            darkMode={darkMode}
                            friends={state.friends}
                            requests={state.requests}
                            savedPosts={savedPosts}
                            onAccept={acceptFriend}
                            onDecline={removeRequest}
                            onOpenProfile={() => setActiveView("profile")}
                        />
                    )}
                </section>

                <aside className="hidden xl:block">
                    <div className="sticky top-[72px] space-y-4">
                        <Panel darkMode={darkMode} title="Sponsored">
                            {marketplace.slice(0, 2).map((item) => (
                                <button key={item.title} className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-black/5">
                                    <img src={item.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                                    <span>
                                        <strong className="block text-sm">{item.title}</strong>
                                        <span className="text-xs text-gray-500">{item.price} near {item.area}</span>
                                    </span>
                                </button>
                            ))}
                        </Panel>

                        <Panel darkMode={darkMode} title="Friend requests">
                            {state.requests.length ? state.requests.slice(0, 2).map((person) => <RequestCard key={person.id} person={person} darkMode={darkMode} compact onAccept={acceptFriend} onDecline={removeRequest} />) : <SmallMuted text="No new requests" />}
                        </Panel>

                        <Panel darkMode={darkMode} title="Contacts">
                            {state.friends.map((person) => (
                                <button
                                    key={person.id}
                                    className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-black/5"
                                    onClick={() => {
                                        setActiveChat(person);
                                        setMessengerOpen(true);
                                    }}
                                >
                                    <OnlineAvatar person={person} size="small" />
                                    <span className="text-sm font-semibold">{person.name}</span>
                                </button>
                            ))}
                        </Panel>
                    </div>
                </aside>
            </section>

            <MobileNav activeView={activeView} setActiveView={setActiveView} />

            {menuOpen && (
                <MenuDrawer
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    activeView={activeView}
                    setActiveView={setActiveView}
                    onClose={() => setMenuOpen(false)}
                />
            )}

            {notificationsOpen && (
                <Popover darkMode={darkMode} title="Notifications" onClose={() => setNotificationsOpen(false)}>
                    {[
                        "Maya commented on your post",
                        "Samir invited you to React Nepal",
                        "Nisha shared a new photo",
                        "Aarav accepted your request",
                        "Your marketplace listing has 3 views",
                    ].map((text) => (
                        <div key={text} className="rounded-md p-3 text-sm font-medium hover:bg-black/5">
                            {text}
                            <span className="block text-xs text-[#0f9f8f]">Just now</span>
                        </div>
                    ))}
                </Popover>
            )}

            {messengerOpen && (
                <Messenger
                    darkMode={darkMode}
                    activeChat={activeChat}
                    messages={state.messages}
                    messageText={messageText}
                    setMessageText={setMessageText}
                    onSubmit={sendMessage}
                    onClose={() => setMessengerOpen(false)}
                />
            )}
        </main>
    );
}

function AuthCard({
    mode,
    credentials,
    setCredentials,
    setMode,
    onSubmit,
}: {
    mode: AuthMode;
    credentials: { email: string; password: string; firstName: string; lastName: string; birthday: string; gender: string };
    setCredentials: (value: { email: string; password: string; firstName: string; lastName: string; birthday: string; gender: string }) => void;
    setMode: (mode: AuthMode) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    const isSignup = mode === "signup";
    const isForgot = mode === "forgot";

    return (
        <section className="mx-auto w-full max-w-[430px]">
            <form className="rounded-lg bg-white p-4 shadow-xl sm:p-5" onSubmit={onSubmit}>
                {isSignup && (
                    <div className="mb-4 border-b border-gray-200 pb-3">
                        <h2 className="text-3xl font-bold">Create a new account</h2>
                        <p className="text-sm text-gray-500">It is quick and easy.</p>
                    </div>
                )}
                {isForgot && (
                    <div className="mb-4 border-b border-gray-200 pb-3">
                        <h2 className="text-2xl font-bold">Find your account</h2>
                        <p className="text-sm text-gray-500">Enter your email or phone to reset your password.</p>
                    </div>
                )}

                {isSignup && (
                    <div className="mb-3 grid grid-cols-2 gap-3">
                        <AuthInput placeholder="First name" value={credentials.firstName} onChange={(value) => setCredentials({ ...credentials, firstName: value })} />
                        <AuthInput placeholder="Surname" value={credentials.lastName} onChange={(value) => setCredentials({ ...credentials, lastName: value })} />
                    </div>
                )}

                <div className="space-y-3">
                    <AuthInput type="email" placeholder="Email address or phone number" value={credentials.email} onChange={(value) => setCredentials({ ...credentials, email: value })} />
                    {!isForgot && <AuthInput type="password" placeholder="Password" value={credentials.password} onChange={(value) => setCredentials({ ...credentials, password: value })} />}
                </div>

                {isSignup && (
                    <div className="mt-3 space-y-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500">Birthday</label>
                            <input className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 outline-none focus:border-[#0f9f8f]" type="date" value={credentials.birthday} onChange={(event) => setCredentials({ ...credentials, birthday: event.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500">Gender</label>
                            <div className="mt-1 grid grid-cols-3 gap-2">
                                {["Female", "Male", "Custom"].map((gender) => (
                                    <label key={gender} className="flex h-10 items-center justify-between rounded-md border border-gray-300 px-3 text-sm">
                                        {gender}
                                        <input type="radio" name="gender" checked={credentials.gender === gender} onChange={() => setCredentials({ ...credentials, gender })} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <button className="mt-4 h-12 w-full rounded-md bg-[#0f9f8f] text-xl font-bold text-white transition hover:bg-[#0b7c70]">
                    {isForgot ? "Reset password" : isSignup ? "Sign Up" : "Log in"}
                </button>

                {!isSignup && !isForgot && (
                    <button type="button" className="mt-4 w-full text-sm font-medium text-[#0f9f8f] hover:underline" onClick={() => setMode("forgot")}>
                        Forgotten password?
                    </button>
                )}

                <div className="my-4 h-px bg-gray-200" />
                <div className="flex justify-center gap-2">
                    {isSignup || isForgot ? (
                        <button type="button" className="rounded-md bg-gray-200 px-5 py-3 font-bold text-gray-800 transition hover:bg-gray-300" onClick={() => setMode("login")}>
                            Back to login
                        </button>
                    ) : (
                        <button type="button" className="rounded-md bg-[#7c3aed] px-5 py-3 text-lg font-bold text-white transition hover:bg-[#6d28d9]" onClick={() => setMode("signup")}>
                            Create new account
                        </button>
                    )}
                </div>
            </form>
            <p className="mt-5 text-center text-sm">
                <strong>Create a Page</strong> for a brand, community, or public figure.
            </p>
        </section>
    );
}

function AuthInput({ type = "text", placeholder, value, onChange }: { type?: string; placeholder: string; value: string; onChange: (value: string) => void }) {
    return (
        <input
            className="h-13 w-full rounded-md border border-gray-300 px-4 text-base outline-none transition focus:border-[#0f9f8f] focus:ring-2 focus:ring-[#dff8f4] sm:text-lg"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
        />
    );
}

function BrandMark({ size = "normal" }: { size?: "normal" | "large" }) {
    return (
        <span
            className={cx(
                "inline-flex items-center justify-center rounded-full bg-[#0f9f8f] font-black text-white shadow-sm",
                size === "large" ? "h-17 w-17 text-4xl" : "h-10 w-10 text-xl",
            )}
        >
            M
        </span>
    );
}

function HeaderBubble({ count, darkMode, children, onClick }: { count: number; darkMode: boolean; children: ReactNode; onClick: () => void }) {
    return (
        <button className={cx("relative flex h-10 w-10 items-center justify-center rounded-full", darkMode ? "bg-[#3a3b3c]" : "bg-gray-200")} onClick={onClick}>
            {children}
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">{count}</span>
        </button>
    );
}

function NavIcon({ item, active, darkMode, onClick }: { item: { label: string; icon: ReactElement }; active: boolean; darkMode: boolean; onClick: () => void }) {
    return (
        <button
            className={cx(
                "flex h-full min-w-18 items-center justify-center border-b-4 px-5 text-xl transition lg:min-w-24",
                active ? "border-[#0f9f8f] text-[#0f9f8f]" : "border-transparent text-gray-500 hover:bg-gray-100",
                darkMode && !active && "hover:bg-white/10",
            )}
            onClick={onClick}
            title={item.label}
            aria-label={item.label}
        >
            {item.icon}
        </button>
    );
}

function SidePerson({ person, active, onClick }: { person: Person; active: boolean; onClick: () => void }) {
    return (
        <button className={cx("flex w-full items-center gap-3 rounded-md p-2 text-left font-semibold transition", active ? "bg-[#dff8f4] text-[#0f9f8f]" : "hover:bg-black/5")} onClick={onClick}>
            <img src={person.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            {person.name}
        </button>
    );
}

function SideNavItem({ item, active, darkMode, onClick }: { item: { label: string; icon: ReactElement }; active: boolean; darkMode: boolean; onClick: () => void }) {
    return (
        <button
            className={cx("flex w-full items-center gap-3 rounded-md p-2 text-left font-semibold transition", active ? "bg-[#dff8f4] text-[#0f9f8f]" : darkMode ? "hover:bg-white/10" : "hover:bg-black/5")}
            onClick={onClick}
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dff8f4] text-[#0f9f8f]">{item.icon}</span>
            {item.label}
        </button>
    );
}

function Panel({ darkMode, title, children }: { darkMode: boolean; title: string; children: ReactNode }) {
    return (
        <section className={cx("rounded-lg border p-3 shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <h2 className="mb-2 text-base font-bold text-gray-500">{title}</h2>
            {children}
        </section>
    );
}

function Stories({ darkMode, onCreate }: { darkMode: boolean; onCreate: () => void }) {
    return (
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            <button className={cx("overflow-hidden rounded-lg border shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")} onClick={onCreate}>
                <img src={me.avatar} alt="" className="h-32 w-full object-cover sm:h-36" />
                <div className="relative px-2 pb-3 pt-5 text-center text-xs font-bold">
                    <span className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#0f9f8f] text-white">
                        <FaPlus />
                    </span>
                    Create story
                </div>
            </button>
            {people.slice(0, 4).map((person) => (
                <button key={person.id} className="relative h-44 overflow-hidden rounded-lg text-left text-white shadow-sm">
                    <img src={person.cover} alt="" className="h-full w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded-full border-4 border-[#0f9f8f]">
                        <img src={person.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs font-bold">{person.name}</span>
                </button>
            ))}
        </section>
    );
}

function Composer({
    darkMode,
    postText,
    privacy,
    setPostText,
    setPrivacy,
    onSubmit,
}: {
    darkMode: boolean;
    postText: string;
    privacy: Privacy;
    setPostText: (value: string) => void;
    setPrivacy: (value: Privacy) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    const inputTone = darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]";
    return (
        <form className={cx("rounded-lg border p-4 shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")} onSubmit={onSubmit}>
            <div className="flex gap-3">
                <img src={me.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <textarea
                    className={cx("min-h-12 flex-1 resize-none rounded-3xl px-4 py-3 outline-none", inputTone)}
                    placeholder={`What's on your mind, Chiranjibi?`}
                    value={postText}
                    onChange={(event) => setPostText(event.target.value)}
                />
            </div>
            <div className="my-3 h-px bg-gray-200/70" />
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                    <ComposerAction icon={<FaVideo className="text-red-500" />} label="Live" />
                    <ComposerAction icon={<FaImage className="text-green-500" />} label="Photo" />
                    <ComposerAction icon={<FaMapMarkerAlt className="text-rose-500" />} label="Check in" />
                </div>
                <div className="flex items-center gap-2">
                    <select className={cx("rounded-md px-2 py-2 text-sm font-semibold outline-none", inputTone)} value={privacy} onChange={(event) => setPrivacy(event.target.value as Privacy)}>
                        <option>Public</option>
                        <option>Friends</option>
                        <option>Only me</option>
                    </select>
                    <button className="rounded-md bg-[#0f9f8f] px-5 py-2 font-bold text-white disabled:opacity-50" disabled={!postText.trim()}>
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}

function ComposerAction({ icon, label }: { icon: ReactElement; label: string }) {
    return (
        <button type="button" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-black/5">
            {icon}
            {label}
        </button>
    );
}

function PostCard({
    post,
    darkMode,
    onReact,
    onComment,
    onShare,
    onSave,
}: {
    post: Post;
    darkMode: boolean;
    onReact: (postId: number, reaction: Reaction) => void;
    onComment: (postId: number, comment: string) => void;
    onShare: (postId: number) => void;
    onSave: (postId: number) => void;
}) {
    const [commentText, setCommentText] = useState("");
    const inputTone = darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]";

    function submitComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onComment(post.id, commentText);
        setCommentText("");
    }

    return (
        <article className={cx("overflow-hidden rounded-lg border shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <div className="flex items-start justify-between p-4">
                <div className="flex min-w-0 gap-3">
                    <OnlineAvatar person={post.author} size="medium" />
                    <div className="min-w-0">
                        <h2 className="truncate font-bold">{post.author.name}</h2>
                        <p className="flex items-center gap-1 text-xs text-gray-500">
                            {post.time} - {privacyIcon(post.privacy)} {post.privacy}
                        </p>
                    </div>
                </div>
                <button className="rounded-full p-2 text-gray-500 hover:bg-black/5" onClick={() => onSave(post.id)} aria-label="Save post">
                    <FaBookmark className={post.saved ? "text-[#0f9f8f]" : ""} />
                </button>
            </div>
            <p className="whitespace-pre-line px-4 pb-3 leading-relaxed">{post.text}</p>
            {post.location && <p className="px-4 pb-3 text-sm font-semibold text-gray-500">At {post.location}</p>}
            {post.image && <img src={post.image} alt="" className="max-h-[540px] w-full object-cover" />}

            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <span className="flex -space-x-1">
                        {(["like", "love", "haha"] as Reaction[]).map((reaction) => (
                            <span key={reaction} className={cx("flex h-5 w-5 items-center justify-center rounded-full text-xs text-white", reactionMeta[reaction].bg)}>
                                {reactionMeta[reaction].icon}
                            </span>
                        ))}
                    </span>
                    {totalReactions(post)}
                </span>
                <span>{post.comments.length} comments - {post.shares} shares</span>
            </div>

            <div className="mx-4 grid grid-cols-3 border-y border-gray-200/80 py-1">
                {(["like", "love", "haha"] as Reaction[]).map((reaction) => (
                    <button
                        key={reaction}
                        className={cx("flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition hover:bg-black/5", post.reaction === reaction ? reactionMeta[reaction].color : "text-gray-500")}
                        onClick={() => onReact(post.id, reaction)}
                    >
                        {reactionMeta[reaction].icon}
                        {reactionMeta[reaction].label}
                    </button>
                ))}
            </div>

            <div className="space-y-3 p-4">
                {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                        <img src={comment.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <div className={cx("rounded-2xl px-3 py-2 text-sm", inputTone)}>
                            <strong>{comment.author}</strong>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
                <form className="flex items-center gap-2" onSubmit={submitComment}>
                    <img src={me.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <input className={cx("h-10 min-w-0 flex-1 rounded-full px-4 text-sm outline-none", inputTone)} placeholder="Write a comment..." value={commentText} onChange={(event) => setCommentText(event.target.value)} />
                    <button className="rounded-full p-2 text-[#0f9f8f]" aria-label="Comment">
                        <FaPaperPlane />
                    </button>
                </form>
                <button className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-bold text-gray-500 transition hover:bg-black/5" onClick={() => onShare(post.id)}>
                    <FaShare />
                    Share
                </button>
            </div>
        </article>
    );
}

function FeatureView({
    title,
    activeView,
    darkMode,
    friends,
    requests,
    savedPosts,
    onAccept,
    onDecline,
    onOpenProfile,
}: {
    title: string;
    activeView: ViewKey;
    darkMode: boolean;
    friends: Person[];
    requests: Person[];
    savedPosts: Post[];
    onAccept: (person: Person) => void;
    onDecline: (personId: number) => void;
    onOpenProfile: () => void;
}) {
    if (activeView === "profile") {
        return <ProfileView darkMode={darkMode} friends={friends} />;
    }

    if (activeView === "friends") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Friends" action="Find friends" />
                <div className="grid gap-3 sm:grid-cols-2">
                    {requests.map((person) => <RequestCard key={person.id} person={person} darkMode={darkMode} onAccept={onAccept} onDecline={onDecline} />)}
                    {friends.map((person) => <PersonTile key={person.id} person={person} darkMode={darkMode} />)}
                </div>
            </section>
        );
    }

    if (activeView === "saved") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Saved" action={`${savedPosts.length} items`} />
                {savedPosts.length ? savedPosts.map((post) => <SavedItem key={post.id} post={post} darkMode={darkMode} />) : <EmptyState darkMode={darkMode} title="No saved posts" text="Saved posts will appear here." />}
            </section>
        );
    }

    if (activeView === "marketplace") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Marketplace" action="Sell item" />
                <div className="grid gap-3 sm:grid-cols-2">
                    {marketplace.map((item) => (
                        <div key={item.title} className={cx("overflow-hidden rounded-lg border shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
                            <img src={item.image} alt="" className="h-48 w-full object-cover" />
                            <div className="p-3">
                                <strong className="block">{item.price}</strong>
                                <span className="text-sm text-gray-500">{item.title} - {item.area}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (activeView === "watch") {
        return (
            <section className="space-y-4">
                <FeatureHeader title="Watch" action="Go live" />
                {videoCards.map((video, index) => (
                    <div key={video} className={cx("overflow-hidden rounded-lg border shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
                        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#0f9f8f] to-[#7c3aed] text-6xl text-white">
                            <FaPlayCircle />
                        </div>
                        <div className="p-4">
                            <strong>{video}</strong>
                            <p className="text-sm text-gray-500">{index + 4}K views - recommended for you</p>
                        </div>
                    </div>
                ))}
            </section>
        );
    }

    const cardsByView: Partial<Record<ViewKey, Array<[string, string, ReactElement]>>> = {
        groups: [
            ["React Nepal", "18 new posts today", <FaUsers />],
            ["Kathmandu Developers", "Live Q&A tonight", <FaBriefcase />],
            ["Frontend Career Club", "3 hiring posts", <FaShieldAlt />],
        ],
        events: [
            ["Community meetup", "Tomorrow at 5:00 PM", <FaCalendarAlt />],
            ["Design review night", "Friday at 7:00 PM", <FaCamera />],
            ["Startup demo day", "June 30", <FaBriefcase />],
        ],
        gaming: [
            ["Word battle", "2 friends playing", <FaGamepad />],
            ["Chess arena", "Daily challenge ready", <FaUserCheck />],
            ["Puzzle sprint", "Beat your score", <FaGift />],
        ],
        memories: [
            ["One year ago", "You posted your first React dashboard", <FaGift />],
            ["Popular photo", "Your city walk photo got 58 reactions", <FaImage />],
        ],
    };
    const cards = cardsByView[activeView] ?? [];

    return (
        <section className="space-y-4">
            <FeatureHeader title={title} action="Create" />
            <div className="grid gap-3">
                {cards.map(([card, detail, icon], index) => (
                    <button key={card} className={cx("flex items-center gap-4 rounded-lg border p-5 text-left shadow-sm transition hover:-translate-y-0.5", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")} onClick={index === 0 ? onOpenProfile : undefined}>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff8f4] text-xl text-[#0f9f8f]">{icon}</span>
                        <span>
                            <span className="block text-lg font-bold">{card}</span>
                            <span className="text-sm text-gray-500">{detail}</span>
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

function ProfileView({ darkMode, friends }: { darkMode: boolean; friends: Person[] }) {
    return (
        <section className="space-y-4">
            <div className={cx("overflow-hidden rounded-lg border shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
                <div className="relative">
                    <img src={me.cover} alt="" className="h-52 w-full object-cover sm:h-72" />
                    <button className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow">
                        <FaCamera />
                        Edit cover
                    </button>
                </div>
                <div className="px-4 pb-5 sm:px-6">
                    <div className="-mt-14 flex flex-col gap-4 sm:-mt-10 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end">
                            <img src={me.avatar} alt="" className="h-32 w-32 rounded-full border-4 border-white object-cover" />
                            <div className="text-center sm:pb-3 sm:text-left">
                                <h1 className="text-3xl font-bold">{me.name}</h1>
                                <p className="font-semibold text-gray-500">{friends.length} friends - {me.city}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#0f9f8f] px-4 py-2 font-bold text-white sm:flex-none"><FaPlus /> Add story</button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-200 px-4 py-2 font-bold text-gray-900 sm:flex-none"><FaCamera /> Edit profile</button>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-4 border-t border-gray-200 pt-2 text-sm font-bold text-gray-500">
                        {["Posts", "About", "Friends", "Photos"].map((tab) => (
                            <button key={tab} className="rounded-md p-3 hover:bg-black/5">{tab}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                <Panel darkMode={darkMode} title="Intro">
                    <p className="text-sm">Building React apps and learning better UI every day.</p>
                    <p className="mt-3 text-sm text-gray-500">Lives in {me.city}</p>
                    <p className="text-sm text-gray-500">Works as {me.role}</p>
                </Panel>
                <Panel darkMode={darkMode} title="Friends">
                    <div className="grid grid-cols-3 gap-2">
                        {friends.slice(0, 6).map((friend) => (
                            <div key={friend.id}>
                                <img src={friend.avatar} alt="" className="aspect-square rounded-md object-cover" />
                                <strong className="mt-1 block truncate text-xs">{friend.name}</strong>
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>
        </section>
    );
}

function FeatureHeader({ title, action }: { title: string; action: string }) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button className="rounded-md bg-[#dff8f4] px-4 py-2 text-sm font-bold text-[#0f9f8f]">{action}</button>
        </div>
    );
}

function RequestCard({ person, compact, darkMode, onAccept, onDecline }: { person: Person; compact?: boolean; darkMode: boolean; onAccept: (person: Person) => void; onDecline: (personId: number) => void }) {
    return (
        <div className={cx("rounded-lg border p-3 shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <div className="flex gap-3">
                <img src={person.avatar} alt="" className={compact ? "h-12 w-12 rounded-full object-cover" : "h-20 w-20 rounded-md object-cover"} />
                <div className="min-w-0 flex-1">
                    <strong className="block truncate">{person.name}</strong>
                    <span className="text-sm text-gray-500">{person.mutual} mutual friends</span>
                    <div className="mt-3 flex gap-2">
                        <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-[#0f9f8f] px-2 py-2 text-sm font-bold text-white" onClick={() => onAccept(person)}>
                            <FaCheck /> Confirm
                        </button>
                        <button className={cx("flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-2 text-sm font-bold", darkMode ? "bg-[#3a3b3c]" : "bg-gray-200")} onClick={() => onDecline(person.id)}>
                            <FaTimes /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PersonTile({ person, darkMode }: { person: Person; darkMode: boolean }) {
    return (
        <div className={cx("rounded-lg border p-3 shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <img src={person.cover} alt="" className="h-32 w-full rounded-md object-cover" />
            <div className="mt-3 flex items-center gap-3">
                <OnlineAvatar person={person} size="large" />
                <div>
                    <strong>{person.name}</strong>
                    <p className="text-sm text-gray-500">{person.role}</p>
                </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#dff8f4] py-2 font-bold text-[#0f9f8f]">
                <FaUserPlus />
                Add to favorites
            </button>
        </div>
    );
}

function SavedItem({ post, darkMode }: { post: Post; darkMode: boolean }) {
    return (
        <div className={cx("flex gap-3 rounded-lg border p-3 shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            {post.image && <img src={post.image} alt="" className="h-24 w-24 rounded-md object-cover" />}
            <div>
                <strong className="line-clamp-2">{post.text}</strong>
                <p className="text-sm text-gray-500">Saved from {post.author.name}</p>
            </div>
        </div>
    );
}

function EmptyState({ darkMode, title, text }: { darkMode: boolean; title: string; text: string }) {
    return (
        <div className={cx("rounded-lg border p-8 text-center shadow-sm", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <strong className="block text-lg">{title}</strong>
            <span className="text-sm text-gray-500">{text}</span>
        </div>
    );
}

function SmallMuted({ text }: { text: string }) {
    return <p className="rounded-md p-3 text-sm font-semibold text-gray-500">{text}</p>;
}

function OnlineAvatar({ person, size }: { person: Person; size: "small" | "medium" | "large" }) {
    const sizeClass = size === "small" ? "h-9 w-9" : size === "medium" ? "h-10 w-10" : "h-12 w-12";
    return (
        <span className="relative shrink-0">
            <img src={person.avatar} alt="" className={cx("rounded-full object-cover", sizeClass)} />
            {person.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />}
        </span>
    );
}

function Popover({ darkMode, title, children, onClose }: { darkMode: boolean; title: string; children: ReactNode; onClose: () => void }) {
    return (
        <section className={cx("fixed right-3 top-16 z-50 w-[min(380px,calc(100vw-24px))] rounded-lg border p-3 shadow-2xl", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <button className="rounded-full p-2 hover:bg-black/5" onClick={onClose} aria-label="Close"><FaTimes /></button>
            </div>
            {children}
        </section>
    );
}

function Messenger({
    darkMode,
    activeChat,
    messages,
    messageText,
    setMessageText,
    onSubmit,
    onClose,
}: {
    darkMode: boolean;
    activeChat: Person;
    messages: Message[];
    messageText: string;
    setMessageText: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}) {
    return (
        <section className={cx("fixed bottom-17 right-3 z-50 flex h-[460px] w-[min(370px,calc(100vw-24px))] flex-col overflow-hidden rounded-lg border shadow-2xl md:bottom-4", darkMode ? "border-white/10 bg-[#242526]" : "border-black/5 bg-white")}>
            <header className="flex items-center justify-between border-b border-gray-200/70 p-3">
                <div className="flex items-center gap-2">
                    <OnlineAvatar person={activeChat} size="medium" />
                    <div>
                        <strong>{activeChat.name}</strong>
                        <span className="block text-xs text-green-500">Active now</span>
                    </div>
                </div>
                <button className="rounded-full p-2 hover:bg-black/5" onClick={onClose} aria-label="Close chat"><FaTimes /></button>
            </header>
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.map((message) => (
                    <div key={message.id} className={cx("flex", message.from === "me" ? "justify-end" : "justify-start")}>
                        <span className={cx("max-w-[75%] rounded-2xl px-3 py-2 text-sm", message.from === "me" ? "bg-[#0f9f8f] text-white" : darkMode ? "bg-[#3a3b3c]" : "bg-gray-100")}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            <form className="flex items-center gap-2 border-t border-gray-200/70 p-3" onSubmit={onSubmit}>
                <input className={cx("h-10 min-w-0 flex-1 rounded-full px-4 outline-none", darkMode ? "bg-[#3a3b3c]" : "bg-gray-100")} placeholder="Aa" value={messageText} onChange={(event) => setMessageText(event.target.value)} />
                <button className="rounded-full bg-[#0f9f8f] p-3 text-white" aria-label="Send message"><FaPaperPlane /></button>
            </form>
        </section>
    );
}

function MobileNav({ activeView, setActiveView }: { activeView: ViewKey; setActiveView: (view: ViewKey) => void }) {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-5 border-t border-black/10 bg-white text-gray-500 shadow md:hidden">
            {mainNav.map((item) => (
                <button key={item.key} className={cx("flex flex-col items-center justify-center gap-1 text-lg", activeView === item.key && "text-[#0f9f8f]")} onClick={() => setActiveView(item.key)} aria-label={item.label}>
                    {item.icon}
                    <span className="text-[10px] font-bold">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

function MenuDrawer({
    darkMode,
    setDarkMode,
    activeView,
    setActiveView,
    onClose,
}: {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    activeView: ViewKey;
    setActiveView: (view: ViewKey) => void;
    onClose: () => void;
}) {
    return (
        <section className="fixed inset-0 z-50 bg-black/35" onClick={onClose}>
            <div className={cx("ml-auto h-full w-[min(380px,100vw)] overflow-y-auto p-4 shadow-2xl", darkMode ? "bg-[#242526] text-[#e4e6eb]" : "bg-white text-[#1c1e21]")} onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Menu</h2>
                    <button className="rounded-full p-2 hover:bg-black/5" onClick={onClose}><FaTimes /></button>
                </div>
                <button className="mb-3 flex w-full items-center justify-between rounded-lg bg-[#dff8f4] p-3 font-bold text-[#0f9f8f]" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Light mode" : "Dark mode"}
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                <div className="grid grid-cols-2 gap-3">
                    {[...mainNav, ...sideNav].map((item) => (
                        <button
                            key={item.key}
                            className={cx("rounded-lg border p-4 text-left font-bold shadow-sm", activeView === item.key ? "border-[#0f9f8f] bg-[#dff8f4] text-[#0f9f8f]" : "border-black/5")}
                            onClick={() => {
                                setActiveView(item.key);
                                onClose();
                            }}
                        >
                            <span className="mb-2 block text-xl">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
