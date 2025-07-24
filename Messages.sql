--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Messages" (id, created_at, "conversationId", "senderId", text, "itemId", "loanDates", "messageType", decision) FROM stdin;
1	2025-07-24 03:01:57.676045+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	\N	6	{}	calendar	\N
2	2025-07-24 03:01:57.713296+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Fdfdfdf	\N	\N	text	\N
\.


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

