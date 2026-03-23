"use client";

// Calendar-based ticket page for Our Hero, Balthazar
import Image from "next/image";
import { useState, useRef, useMemo, memo, useCallback, useTransition, useEffect } from "react";
import { motion } from "framer-motion";

// Brand Colors - Dark theme palette
const BRAND = {
  black: "#000000",
  white: "#ffffff",
  gray: "#666666",
  lightGray: "#1a1a1a",
  darkGray: "#111111",
};

// Real movie data from ourherobalthazar.com
const MOVIE = {
  title: "OUR HERO, BALTHAZAR",
  tagline: "TAKE A SHOT AT FRIENDSHIP",
  synopsis: "Ultra-wealthy NYC teenager Balthy makes dramatic gun control videos to impress his activist crush. When an online troll targets his content, Balthy becomes convinced he's communicating with a potential school shooter and embarks on an ill-advised journey to Texas to confront him.",
  director: "Oscar Boyson",
  writers: "Ricky Camilleri & Oscar Boyson",
  year: "2026",
  rating: "R",
  runtime: "98 mins",
  cast: [
    "Jaeden Martell",
    "Asa Butterfield",
    "Anna Baryshnikov",
    "Ricky Camilleri",
    "Noah Jupe",
  ],
};

// Theater logo paths
const THEATER_LOGOS: Record<string, string> = {
  "Regal": "/assets/ohb/regal.svg",
  "AMC": "/assets/ohb/amc.svg",
  "Alamo": "/assets/ohb/alamo.svg",
};

// Showtime data structure
interface Showtime {
  theater: string;
  date: string;
  time: string;
  eventType: string;
  ticketLink: string;
}

// Real showtime data from CSV
const SHOWTIMES_DATA: Showtime[] = [
  { theater: "Regal Union Square", date: "2026-03-26", time: "7:30 PM", eventType: "Live Intro with Cast & Filmmakers", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-live-intro-wcast-filmmakers-ho00021029?date=03-26-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-27-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-27-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-27-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "7:00 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-live-qa-w-cast-filmmakers-ho00020997?id=287491&site=1320&date=03-27-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "8:00 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-live-qa-w-cast-filmmakers-ho00020997?id=287491&site=1320&date=03-27-2026" },
  { theater: "Regal Union Square", date: "2026-03-27", time: "10:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-27-2026" },
  // Mar 28 - New York
  { theater: "Regal Union Square", date: "2026-03-28", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-28-2026" },
  { theater: "Regal Union Square", date: "2026-03-28", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-28-2026" },
  { theater: "Regal Union Square", date: "2026-03-28", time: "10:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-28-2026" },
  // Mar 29 - New York
  { theater: "Regal Union Square", date: "2026-03-29", time: "10:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-29-2026" },
  { theater: "Regal Union Square", date: "2026-03-29", time: "6:00 PM", eventType: "General Admission (Sold Out)", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-29-2026" },
  { theater: "Regal Union Square", date: "2026-03-29", time: "8:30 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-29-2026" },
  { theater: "Regal Union Square", date: "2026-03-29", time: "11:00 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-29-2026" },
  // Mar 30 - New York
  { theater: "Regal Union Square", date: "2026-03-30", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-30-2026" },
  { theater: "Regal Union Square", date: "2026-03-30", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-30-2026" },
  { theater: "Regal Union Square", date: "2026-03-30", time: "9:50 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-30-2026" },
  // Mar 31 - New York
  { theater: "Regal Union Square", date: "2026-03-31", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-31-2026" },
  { theater: "Regal Union Square", date: "2026-03-31", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-31-2026" },
  { theater: "Regal Union Square", date: "2026-03-31", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-31-2026" },
  { theater: "Regal Union Square", date: "2026-03-31", time: "7:10 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-31-2026" },
  { theater: "Regal Union Square", date: "2026-03-31", time: "9:50 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=03-31-2026" },
  // Apr 1 - New York
  { theater: "Regal Union Square", date: "2026-04-01", time: "8:20 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-01", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-01", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-01", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-01", time: "7:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-01", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-01-2026" },
  { theater: "Regal Union Square", date: "2026-04-02", time: "12:40 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  // Apr 2 - New York
  { theater: "Regal Union Square", date: "2026-04-02", time: "8:20 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  { theater: "Regal Union Square", date: "2026-04-02", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  { theater: "Regal Union Square", date: "2026-04-02", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  { theater: "Regal Union Square", date: "2026-04-02", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  { theater: "Regal Union Square", date: "2026-04-02", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://www.regmovies.com/movies/our-hero-balthazar-ho00020753?date=04-02-2026" },
  { theater: "AMC The Americana at Brand 18", date: "2026-04-03", time: "7:00 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://www.amctheatres.com/movies/our-hero-balthazar-live-q-a-with-cast-filmmakers-83146/showtimes?date=2026-04-03&theatre=amc-the-americana-at-brand-18" },
  { theater: "AMC Burbank Town Center 8", date: "2026-04-03", time: "7:45 PM", eventType: "General Admission", ticketLink: "https://www.amctheatres.com/movies/our-hero-balthazar-83057/showtimes?date=2026-04-03&theatre=amc-burbank-town-center-8" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-03", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-03", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-03", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-03", time: "7:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-03", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "7:00 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "7:45 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-04", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-05", time: "11:00 AM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-05", time: "1:40 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-05", time: "4:20 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-05", time: "7:00 PM", eventType: "Live Q&A with Cast & Filmmakers (Sold Out)", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-05", time: "7:45 PM", eventType: "Live Q&A with Cast & Filmmakers", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-07", time: "11:20 AM", eventType: "Baby Day Show", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-07", time: "2:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-07", time: "4:40 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-07", time: "7:20 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-07", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-08", time: "11:20 AM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-08", time: "2:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-08", time: "4:40 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-08", time: "7:20 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
  { theater: "Alamo Drafthouse DTLA", date: "2026-04-08", time: "10:00 PM", eventType: "General Admission", ticketLink: "https://drafthouse.com/los-angeles/show/our-hero-balthazar?cinemaId=1701&sessionId=109784" },
];

// City mapping for theaters
const THEATER_CITIES: Record<string, string> = {
  "Regal Union Square": "New York",
  "AMC The Americana at Brand 18": "Los Angeles",
  "AMC Burbank Town Center 8": "Los Angeles",
  "Alamo Drafthouse DTLA": "Los Angeles",
};

// Get city from theater name
const getTheaterCity = (theaterName: string): string => {
  return THEATER_CITIES[theaterName] || "Unknown";
};

// Get theater brand from name
const getTheaterBrand = (theaterName: string): string | null => {
  if (theaterName.toLowerCase().includes("regal")) return "Regal";
  if (theaterName.toLowerCase().includes("amc")) return "AMC";
  if (theaterName.toLowerCase().includes("alamo")) return "Alamo";
  return null;
};

// Check if event is special (Q&A, intro, etc.)
const isSpecialEvent = (eventType: string): boolean => {
  return eventType.toLowerCase().includes("q&a") ||
         eventType.toLowerCase().includes("intro") ||
         eventType.toLowerCase().includes("baby day");
};

// Check if event is sold out
const isSoldOut = (eventType: string): boolean => {
  return eventType.toLowerCase().includes("sold out");
};

// Parse time string to minutes for sorting (cached)
const parseTimeToMinutes = (time: string): number => {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const isPM = match[3].toUpperCase() === "PM";
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

// Pre-sort showtimes data once at module load
const SORTED_SHOWTIMES_DATA = [...SHOWTIMES_DATA].sort((a, b) => {
  // Sort by date first, then by theater, then by time
  if (a.date !== b.date) return a.date.localeCompare(b.date);
  if (a.theater !== b.theater) return a.theater.localeCompare(b.theater);
  return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
});


// Memoized Date Button - prevents unnecessary re-renders
const DateButton = memo(function DateButton({
  date,
  isSelected,
  isDisabled,
  onSelect,
}: {
  date: { dateStr: string; day: string; weekday: string; month: string };
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (dateStr: string) => void;
}) {
  return (
    <button
      onClick={() => !isDisabled && onSelect(date.dateStr)}
      disabled={isDisabled}
      className={`flex-shrink-0 flex flex-col items-center justify-center px-6 md:px-10 py-6 border-r-2 transition-all ${
        isDisabled
          ? "bg-black/50 border-white/5 cursor-not-allowed"
          : isSelected
          ? "bg-white border-black"
          : "bg-black border-white/10"
      }`}
      style={{ minWidth: "120px" }}
    >
      <span className={`text-[10px] tracking-[0.2em] font-bold mb-1 uppercase ${
        isDisabled ? "text-white/30" : isSelected ? "text-black" : "text-white"
      }`}>
        {date.month}
      </span>
      <span className={`text-[10px] tracking-[0.15em] font-bold mb-1 uppercase ${
        isDisabled ? "text-white/20" : isSelected ? "text-black/40" : "text-white/40"
      }`}>
        {date.weekday}
      </span>
      <span
        className={`text-5xl md:text-7xl tracking-tighter ${
          isDisabled ? "text-white/30" : isSelected ? "text-black" : "text-white"
        }`}
        style={{
          fontFamily: "'Neue Haas Grotesk Display', 'Inter', sans-serif",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {date.day}
      </span>
    </button>
  );
});

// Memoized Theater Row - prevents unnecessary re-renders
const TheaterRow = memo(function TheaterRow({
  theaterName,
  showtimes
}: {
  theaterName: string;
  showtimes: Showtime[];
}) {
  const brand = getTheaterBrand(theaterName);
  const logoPath = brand ? THEATER_LOGOS[brand] : null;

  return (
    <div className="border-b-2 border-white/20 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-8 items-start">
      {/* Theater Info */}
      <div className="flex flex-col">
        {logoPath && (
          <div className="h-5 mb-2 flex items-center">
            <img
              src={logoPath}
              alt={brand || ""}
              className="invert"
              style={{ width: "60px", height: "20px", objectFit: "contain", objectPosition: "left" }}
            />
          </div>
        )}
        <span className="text-sm font-bold uppercase text-white">{theaterName}</span>
        {showtimes.some(s => isSpecialEvent(s.eventType)) && (
          <div className="mt-2 text-[10px] font-bold px-2 py-1 bg-white text-black inline-block self-start uppercase tracking-wide">
            Special Event
          </div>
        )}
      </div>

      {/* Showtimes */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {showtimes.map((showtime, j) => {
          const special = isSpecialEvent(showtime.eventType);
          const soldOut = isSoldOut(showtime.eventType);

          return (
            <a
              key={j}
              href={soldOut ? undefined : showtime.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 border-2 transition-all font-bold tracking-tight uppercase flex flex-col items-center ${soldOut ? "cursor-not-allowed opacity-50" : "hover:scale-105"}`}
              style={{
                borderColor: BRAND.white,
                color: special ? BRAND.black : BRAND.white,
                backgroundColor: special ? BRAND.white : "transparent",
                pointerEvents: soldOut ? "none" : "auto",
              }}
              title={showtime.eventType}
            >
              <span className="text-base md:text-lg">{showtime.time}</span>
              {special && (
                <span className="text-[8px] mt-1 tracking-wider opacity-70">
                  {showtime.eventType.includes("Q&A") ? "Q&A" :
                   showtime.eventType.includes("Intro") ? "INTRO" :
                   showtime.eventType.includes("Baby") ? "BABY DAY" : "SPECIAL"}
                </span>
              )}
              {soldOut && (
                <span className="text-[8px] mt-1 tracking-wider text-red-500 font-bold">
                  SOLD OUT
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
});

// Memoized Hero Section - prevents re-render on date changes
const HeroSection = memo(function HeroSection() {
  return (
    <div className="relative py-12 px-6 md:px-12 lg:px-16 border-b-2 border-white/20" style={{ backgroundColor: BRAND.black }}>
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl mx-auto">
        {/* Movie Poster */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="relative w-[260px] h-[390px] md:w-[300px] md:h-[450px] overflow-hidden">
            <Image
              src="/assets/ohb/poster.jpg"
              alt={MOVIE.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Movie Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <p
            className="text-xs tracking-[0.2em] font-bold mb-3 uppercase text-white"
          >
            {MOVIE.tagline}
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 uppercase leading-[0.9] text-white"
            style={{
              fontFamily: "'Neue Haas Grotesk Display', 'Inter', sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            our hero,<br/>balthazar
          </h1>
          <p className="text-white/80 max-w-xl mb-8 leading-relaxed text-sm">
            {MOVIE.synopsis}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Directed by</p>
              <p className="text-sm font-bold text-white">{MOVIE.director}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Written by</p>
              <p className="text-sm font-bold text-white">{MOVIE.writers}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Film Details</p>
              <p className="text-sm font-bold text-white">
                {MOVIE.year} <span className="inline-block border-2 border-white px-1 text-[10px] ml-1 font-bold">{MOVIE.rating}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Runtime</p>
              <p className="text-sm font-bold text-white">{MOVIE.runtime}</p>
            </div>
          </div>

          {/* Cast */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Starring</p>
            <p className="text-sm font-bold text-white">{MOVIE.cast.join(", ")}</p>
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group border-2 border-white px-4 py-2 hover:bg-white hover:text-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <span className="text-xs tracking-[0.15em] font-bold uppercase">Share</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
});

export default function OurHeroBalthazarPage() {
  const [showSpecialOnly, setShowSpecialOnly] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Get unique cities from showtimes
  const availableCities = useMemo(() => {
    const citySet = new Set(SHOWTIMES_DATA.map(s => getTheaterCity(s.theater)));
    return Array.from(citySet).sort();
  }, []);

  // Get dates available for selected city
  const datesForSelectedCity = useMemo(() => {
    if (!selectedCity) return new Set<string>();
    const dates = new Set<string>();
    SHOWTIMES_DATA.forEach(s => {
      if (getTheaterCity(s.theater) === selectedCity) {
        dates.add(s.date);
      }
    });
    return dates;
  }, [selectedCity]);

  // Get dates that have special events (Q&A, intro, etc.)
  const datesWithSpecialEvents = useMemo(() => {
    const dates = new Set<string>();
    SHOWTIMES_DATA.forEach(s => {
      if (isSpecialEvent(s.eventType)) {
        dates.add(s.date);
      }
    });
    return dates;
  }, []);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
      setLocationDropdownOpen(false);
    }
  }, []);

  // Set up click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Get unique dates from showtimes
  const availableDates = useMemo(() => {
    const dateSet = new Set(SHOWTIMES_DATA.map(s => s.date));
    return Array.from(dateSet).sort().map(dateStr => {
      const date = new Date(dateStr + "T00:00:00");
      return {
        dateStr,
        day: date.getDate().toString().padStart(2, "0"),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      };
    });
  }, []);

  const [selectedDateStr, setSelectedDateStr] = useState(availableDates[0]?.dateStr || "");
  const [isPending, startTransition] = useTransition();

  const handleDateClick = useCallback((dateStr: string) => {
    startTransition(() => {
      setSelectedDateStr(dateStr);
    });
  }, []);

  // Get showtimes for ALL dates to pre-render them
  const showtimesByDateAndTheater = useMemo(() => {
    const grouped: Record<string, Record<string, Showtime[]>> = {};

    availableDates.forEach(date => {
      let filtered = SORTED_SHOWTIMES_DATA.filter(s => s.date === date.dateStr);
      if (showSpecialOnly) {
        filtered = filtered.filter(s => isSpecialEvent(s.eventType));
      }
      // Filter by selected city
      if (selectedCity) {
        filtered = filtered.filter(s => getTheaterCity(s.theater) === selectedCity);
      }

      const byTheater: Record<string, Showtime[]> = {};
      filtered.forEach(showtime => {
        if (!byTheater[showtime.theater]) {
          byTheater[showtime.theater] = [];
        }
        byTheater[showtime.theater].push(showtime);
      });
      grouped[date.dateStr] = byTheater;
    });

    return grouped;
  }, [availableDates, showSpecialOnly, selectedCity]);

  const currentTheaters = Object.keys(showtimesByDateAndTheater[selectedDateStr] || {});

  return (
    <div
        className="min-h-screen text-white"
        style={{
          fontFamily: "'Neue Haas Grotesk Text Pro', 'Inter', sans-serif",
          backgroundColor: BRAND.black,
        }}
      >
        {/* Back Arrow */}
        <div className="fixed top-6 left-6 z-50">
          <a
            href="/"
            className="w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>

        {/* Date Picker */}
        <div className="relative pt-6 border-b-2 border-white/20" style={{ backgroundColor: BRAND.black }}>
          {/* Buy Tickets Header */}
          <div className="text-center pb-4">
            <h2
              className="text-white text-2xl md:text-3xl uppercase tracking-[0.15em]"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', 'Inter', sans-serif",
                fontWeight: 900,
              }}
            >
              Buy Tickets
            </h2>
          </div>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {availableDates.map((date) => {
              const cityDisabled = selectedCity !== null && !datesForSelectedCity.has(date.dateStr);
              const specialDisabled = showSpecialOnly && !datesWithSpecialEvents.has(date.dateStr);
              const isDisabled = cityDisabled || specialDisabled;
              return (
                <DateButton
                  key={date.dateStr}
                  date={date}
                  isSelected={selectedDateStr === date.dateStr}
                  isDisabled={isDisabled}
                  onSelect={handleDateClick}
                />
              );
            })}
          </div>
          {/* Scroll arrows */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -240, behavior: "smooth" })}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-colors border-2"
            style={{
              backgroundColor: BRAND.black,
              borderColor: BRAND.white,
              color: BRAND.white,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-colors border-2"
            style={{
              backgroundColor: BRAND.black,
              borderColor: BRAND.white,
              color: BRAND.white,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Location Bar */}
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between relative" style={{ backgroundColor: BRAND.lightGray }} ref={locationRef}>
          <button
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wide">
              {selectedCity || "All Locations"}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={`transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown */}
          {locationDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-black border-2 border-t-0 border-white/20 z-50 shadow-lg">
              <button
                onClick={() => {
                  setSelectedCity(null);
                  setLocationDropdownOpen(false);
                }}
                className={`w-full px-6 py-3 text-left text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors flex items-center justify-between ${
                  selectedCity === null ? "bg-white text-black" : "text-white"
                }`}
              >
                All Locations
                {selectedCity === null && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
              {availableCities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setLocationDropdownOpen(false);
                    // If current selected date is not available in the new city, select the first available date
                    const cityDates = new Set<string>();
                    SHOWTIMES_DATA.forEach(s => {
                      if (getTheaterCity(s.theater) === city) {
                        cityDates.add(s.date);
                      }
                    });
                    if (!cityDates.has(selectedDateStr)) {
                      const firstAvailableDate = availableDates.find(d => cityDates.has(d.dateStr));
                      if (firstAvailableDate) {
                        setSelectedDateStr(firstAvailableDate.dateStr);
                      }
                    }
                  }}
                  className={`w-full px-6 py-3 text-left text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors flex items-center justify-between ${
                    selectedCity === city ? "bg-white text-black" : "text-white"
                  }`}
                >
                  {city}
                  {selectedCity === city && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Special Events Toggle */}
            <button
              onClick={() => {
                const newValue = !showSpecialOnly;
                setShowSpecialOnly(newValue);
                if (newValue && !datesWithSpecialEvents.has(selectedDateStr)) {
                  const firstAvailableDate = availableDates.find(d => datesWithSpecialEvents.has(d.dateStr));
                  if (firstAvailableDate) {
                    setSelectedDateStr(firstAvailableDate.dateStr);
                  }
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 border-2 text-[10px] font-bold uppercase tracking-wide transition-all ${
                showSpecialOnly
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/40 hover:border-white"
              }`}
            >
              <span>Q&A / Special</span>
              {showSpecialOnly && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
            <div className="text-xs tracking-[0.15em] font-bold uppercase text-white/60">
              {currentTheaters.length} {currentTheaters.length === 1 ? "Theater" : "Theaters"}
            </div>
          </div>
        </div>

        {/* Theater Showtimes Grid */}
        <div className="px-6 md:px-12 lg:px-16 py-8" style={{ backgroundColor: BRAND.black }}>
          <div className="max-w-6xl mx-auto">
            {availableDates.map(date => {
              const byTheater = showtimesByDateAndTheater[date.dateStr] || {};
              const theaterNames = Object.keys(byTheater);
              const isSelected = selectedDateStr === date.dateStr;

              return (
                <div
                  key={date.dateStr}
                  style={{ display: isSelected ? "block" : "none" }}
                >
                  {theaterNames.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-lg font-bold uppercase tracking-wide opacity-60">
                        {showSpecialOnly ? "No special events on this date" : "No showtimes available for this date"}
                      </p>
                    </div>
                  ) : (
                    theaterNames.map((theaterName) => (
                      <TheaterRow
                        key={theaterName}
                        theaterName={theaterName}
                        showtimes={byTheater[theaterName]}
                      />
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Section - Movie poster and description */}
        <HeroSection />

        {/* Additional Details Footer */}
        <div className="px-6 md:px-12 lg:px-16 py-12" style={{ backgroundColor: BRAND.lightGray }}>
          <div className="max-w-6xl mx-auto">
            <h3
              className="text-2xl mb-8 uppercase text-white"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', 'Inter', sans-serif",
                fontWeight: 900,
              }}
            >
              Additional Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Directed by</p>
                <p className="text-sm font-bold text-white">{MOVIE.director}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Written by</p>
                <p className="text-sm font-bold text-white">{MOVIE.writers}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Film Details</p>
                <p className="text-sm font-bold text-white">
                  {MOVIE.year} <span className="inline-block border-2 border-white px-1 text-[10px] ml-1 font-bold">{MOVIE.rating}</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Runtime</p>
                <p className="text-sm font-bold text-white">{MOVIE.runtime}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-1 uppercase">Starring</p>
              <p className="text-sm font-bold text-white">{MOVIE.cast.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Footer - OHB Style */}
        <footer
          className="px-6 md:px-12 lg:px-16 py-6 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.15em] font-bold uppercase"
          style={{ backgroundColor: BRAND.black, color: BRAND.white }}
        >
          <div className="flex gap-6">
            <a href="https://ourherobalthazar.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              Official Site
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              Twitter
            </a>
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>&copy; 2026 Picturehouse</span>
        </footer>
      </div>
  );
}
