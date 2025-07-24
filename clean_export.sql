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
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Items" (id, created_at, "userId", category, image, title, description, method, available, "tradeCount", "unavailableDates") FROM stdin;
6	2025-07-23 10:52:11.202098+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	Shoes	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/0FD74DB1-265E-4C25-A9F0-EB8CE573D713.jpg	YSL Heels	sleek, red and pretty	swap	t	0	\N
7	2025-07-24 02:46:46.861519+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Clothing	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/9967797B-7299-43B4-AAA6-5C40FB087D65.jpg	Red Blouse	tight fitting, perfect for an event	loan	t	0	{"2025-07-23": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-25": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-28": {"marked": true, "dotColor": "red", "selected": true}}
\.


--
-- Data for Name: Accessories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Accessories" (id, created_at, "itemId", subcategory, weight, material, condition, color) FROM stdin;
\.


--
-- Data for Name: CalendarDates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CalendarDates" (id, created_at, "userId", item, "itemType", dates) FROM stdin;
\.


--
-- Data for Name: Clothing; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Clothing" (id, created_at, "itemId", subcategory, size, weight, fabric, condition, color) FROM stdin;
2	2025-07-24 02:46:46.968969+00	7	Shirt - Button Up Short	S	0.2	Wool	rarely-worn	#FFD700
\.


--
-- Data for Name: Conversations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Conversations" (id, created_at, "userId_1", "userId_2") FROM stdin;
1	2025-07-24 03:01:57.623634+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	fc65b6f1-6b7f-49af-9c99-ee3f06de3591
\.


--
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Groups" (id, created_at, "ambassadorId", name, description, location, "numberOfMem", avatar, status, rules) FROM stdin;
1	2025-07-21 12:21:26.540824+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	QVM Squad	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet felis id felis laoreet, sollicitudin sodales est facilisis. Aliquam ornare turpis sit amet justo ullamcorper, at facilisis turp.	Melbourne, 3000	1	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/927023E0-4FF0-4187-BD90-341E1CEF2C38.jpg	approve	{Rgrgrgrgr,"Aliquam ornare turpis sit amet justo ullamcorper, at facilisis turpis pharetra.","Suspendisse non augue eget diam viverra ornare auctor non leo."}
\.


--
-- Data for Name: ItemConversions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ItemConversions" (id, name, litres, carbon, scalable, category) FROM stdin;
2	T-Shirt	2700	23	t	Clothing
1	Jeans	3781	33.4	t	Clothing
3	Activewear	2700	23	t	Clothing
4	Coat	2700	23	t	Clothing
5	Dress	2700	23	t	Clothing
6	Fur	36350	176	f	Clothing
7	Blazer	36350	176	f	Clothing
8	Jacket - Leather	36350	176	f	Clothing
9	Jacket - Sports/denim	36350	176	f	Clothing
10	Jacket - Other	36350	176	f	Clothing
11	Jumper	3000	23	t	Clothing
12	Jumpsuit	2700	23	f	Clothing
13	Knitwear	2700	23	t	Clothing
14	Overalls	2700	23	t	Clothing
15	Pant	3781	23	t	Clothing
16	Set	2700	23	t	Clothing
17	Shirt - Button Up Long	2700	23	t	Clothing
18	Shirt - Button Up Short	2700	23	t	Clothing
19	Skirt	2700	23	t	Clothing
20	Sleepwear	2700	23	t	Clothing
21	Suit	3781	33.4	t	Clothing
22	Swmiwear	3781	33.4	t	Clothing
23	Vest	2700	23	t	Clothing
24	Boots	8543	16.7	t	Shoes
25	Heels	8543	16.7	t	Shoes
26	Flats	5669	5.8	t	Shoes
27	Sandals	5660	5.8	t	Shoes
28	Loafers	5669	5.8	t	Shoes
29	Sneakers/Running shoes	5669	16.7	t	Shoes
30	Jewellery	450	14.4	f	Accessories
31	Belt	450	14.4	f	Accessories
32	Sunglasses	450	14.4	f	Accessories
33	Bag - Leather	17000	100.5	f	Accessories
34	Bag	1100	14.4	f	Accessories
35	Scarf	450	14.4	f	Accessories
36	Hat	450	14.4	f	Accessories
\.


--
-- Data for Name: JoinRequests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."JoinRequests" (id, created_at, "userId", "groupId", message, status) FROM stdin;
1	2025-07-21 13:13:57.793398+00	68c1c652-43a4-4882-b89d-6550a16a5b5e	1	I would love to join	Accepted
2	2025-07-22 06:08:20.185849+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	1	Fdfdf	Accepted
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Messages" (id, created_at, "conversationId", "senderId", text, "itemId", "loanDates", "messageType", decision) FROM stdin;
1	2025-07-24 03:01:57.676045+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	\N	6	{}	calendar	\N
2	2025-07-24 03:01:57.713296+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Fdfdfdf	\N	\N	text	\N
\.


--
-- Data for Name: Shoes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Shoes" (id, created_at, "itemId", subcategory, size, weight, fabric, shoelength, condition, color) FROM stdin;
5	2025-07-23 10:52:11.319724+00	6	Heels	7	0.8	polyester	short	rarely-worn	#FFC0CB
\.


--
-- Data for Name: Wishlist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Wishlist" (id, created_at, "userId", "itemId") FROM stdin;
5	2025-07-24 03:01:27.415178+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	6
\.


--
-- Data for Name: messages_2025_07_21; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_21 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_22; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_22 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_23; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_23 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_24; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_24 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_25; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_25 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_26; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_26 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_27; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_07_27 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-07-21 06:38:16
20211116045059	2025-07-21 06:38:16
20211116050929	2025-07-21 06:38:16
20211116051442	2025-07-21 06:38:16
20211116212300	2025-07-21 06:38:16
20211116213355	2025-07-21 06:38:16
20211116213934	2025-07-21 06:38:16
20211116214523	2025-07-21 06:38:16
20211122062447	2025-07-21 06:38:16
20211124070109	2025-07-21 06:38:16
20211202204204	2025-07-21 06:38:16
20211202204605	2025-07-21 06:38:16
20211210212804	2025-07-21 06:38:16
20211228014915	2025-07-21 06:38:16
20220107221237	2025-07-21 06:38:16
20220228202821	2025-07-21 06:38:16
20220312004840	2025-07-21 06:38:16
20220603231003	2025-07-21 06:38:16
20220603232444	2025-07-21 06:38:16
20220615214548	2025-07-21 06:38:16
20220712093339	2025-07-21 06:38:16
20220908172859	2025-07-21 06:38:16
20220916233421	2025-07-21 06:38:16
20230119133233	2025-07-21 06:38:16
20230128025114	2025-07-21 06:38:16
20230128025212	2025-07-21 06:38:16
20230227211149	2025-07-21 06:38:16
20230228184745	2025-07-21 06:38:16
20230308225145	2025-07-21 06:38:16
20230328144023	2025-07-21 06:38:16
20231018144023	2025-07-21 06:38:16
20231204144023	2025-07-21 06:38:16
20231204144024	2025-07-21 06:38:16
20231204144025	2025-07-21 06:38:16
20240108234812	2025-07-21 06:38:16
20240109165339	2025-07-21 06:38:16
20240227174441	2025-07-21 06:38:16
20240311171622	2025-07-21 06:38:16
20240321100241	2025-07-21 06:38:16
20240401105812	2025-07-21 06:38:16
20240418121054	2025-07-21 06:38:16
20240523004032	2025-07-21 06:38:16
20240618124746	2025-07-21 06:38:16
20240801235015	2025-07-21 06:38:16
20240805133720	2025-07-21 06:38:16
20240827160934	2025-07-21 06:38:16
20240919163303	2025-07-21 06:38:16
20240919163305	2025-07-21 06:38:16
20241019105805	2025-07-21 06:38:16
20241030150047	2025-07-21 06:38:16
20241108114728	2025-07-21 06:38:16
20241121104152	2025-07-21 06:38:16
20241130184212	2025-07-21 06:38:16
20241220035512	2025-07-21 06:38:16
20241220123912	2025-07-21 06:38:16
20241224161212	2025-07-21 06:38:16
20250107150512	2025-07-21 06:38:16
20250110162412	2025-07-21 06:38:16
20250123174212	2025-07-21 06:38:16
20250128220012	2025-07-21 06:38:16
20250506224012	2025-07-21 06:38:16
20250523164012	2025-07-21 06:38:16
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250227033148	{"create table \\"public\\".\\"Accessories\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"weight\\" text not null,\n    \\"material\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"CalendarDates\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"item\\" text not null,\n    \\"itemType\\" text not null,\n    \\"dates\\" jsonb not null\n)","alter table \\"public\\".\\"CalendarDates\\" enable row level security","create table \\"public\\".\\"Clothing\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"size\\" text not null,\n    \\"weight\\" text not null,\n    \\"fabric\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"Conversations\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId_1\\" uuid,\n    \\"userId_2\\" uuid\n)","create table \\"public\\".\\"Groups\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"ambassadorId\\" uuid not null,\n    \\"name\\" text not null,\n    \\"description\\" text not null,\n    \\"location\\" text not null,\n    \\"rules\\" text not null,\n    \\"numberOfMem\\" bigint not null,\n    \\"avatar\\" text not null\n)","create table \\"public\\".\\"ItemConversions\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"name\\" text not null,\n    \\"litres\\" bigint not null,\n    \\"carbon\\" double precision not null,\n    \\"scalable\\" boolean not null,\n    \\"category\\" text\n)","create table \\"public\\".\\"Items\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"category\\" text not null,\n    \\"image\\" text not null,\n    \\"title\\" text not null,\n    \\"description\\" text not null,\n    \\"method\\" text not null,\n    \\"available\\" boolean not null default true,\n    \\"tradeCount\\" bigint default '0'::bigint,\n    \\"unavailableDates\\" jsonb\n)","create table \\"public\\".\\"JoinRequests\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"groupId\\" bigint not null,\n    \\"message\\" text not null default ''::text,\n    \\"status\\" text not null default 'Pending'::text\n)","create table \\"public\\".\\"Messages\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"conversationId\\" bigint not null,\n    \\"senderId\\" uuid not null,\n    \\"text\\" text,\n    \\"itemId\\" bigint,\n    \\"loanDates\\" jsonb default 'null'::jsonb,\n    \\"messageType\\" text not null,\n    \\"decision\\" text\n)","create table \\"public\\".\\"Shoes\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"size\\" text not null,\n    \\"weight\\" text not null,\n    \\"fabric\\" text not null,\n    \\"shoelength\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"Wishlist\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid,\n    \\"itemId\\" bigint\n)","CREATE UNIQUE INDEX \\"Accessories_pkey\\" ON public.\\"Accessories\\" USING btree (id)","CREATE UNIQUE INDEX \\"CalendarDates_pkey\\" ON public.\\"CalendarDates\\" USING btree (id)","CREATE UNIQUE INDEX \\"Conversations_pkey\\" ON public.\\"Conversations\\" USING btree (id)","CREATE UNIQUE INDEX \\"ItemConversions_name_key\\" ON public.\\"ItemConversions\\" USING btree (name)","CREATE UNIQUE INDEX \\"ItemConversions_pkey\\" ON public.\\"ItemConversions\\" USING btree (id)","CREATE UNIQUE INDEX \\"Items_pkey\\" ON public.\\"Items\\" USING btree (id)","CREATE UNIQUE INDEX \\"JoinRequests_pkey\\" ON public.\\"JoinRequests\\" USING btree (id)","CREATE UNIQUE INDEX \\"Messages_pkey\\" ON public.\\"Messages\\" USING btree (id)","CREATE UNIQUE INDEX \\"Wishlist_pkey\\" ON public.\\"Wishlist\\" USING btree (id)","CREATE UNIQUE INDEX clothing_pkey ON public.\\"Clothing\\" USING btree (id)","CREATE UNIQUE INDEX groups_pkey ON public.\\"Groups\\" USING btree (id)","CREATE UNIQUE INDEX shoes_pkey ON public.\\"Shoes\\" USING btree (id)","alter table \\"public\\".\\"Accessories\\" add constraint \\"Accessories_pkey\\" PRIMARY KEY using index \\"Accessories_pkey\\"","alter table \\"public\\".\\"CalendarDates\\" add constraint \\"CalendarDates_pkey\\" PRIMARY KEY using index \\"CalendarDates_pkey\\"","alter table \\"public\\".\\"Clothing\\" add constraint \\"clothing_pkey\\" PRIMARY KEY using index \\"clothing_pkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_pkey\\" PRIMARY KEY using index \\"Conversations_pkey\\"","alter table \\"public\\".\\"Groups\\" add constraint \\"groups_pkey\\" PRIMARY KEY using index \\"groups_pkey\\"","alter table \\"public\\".\\"ItemConversions\\" add constraint \\"ItemConversions_pkey\\" PRIMARY KEY using index \\"ItemConversions_pkey\\"","alter table \\"public\\".\\"Items\\" add constraint \\"Items_pkey\\" PRIMARY KEY using index \\"Items_pkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_pkey\\" PRIMARY KEY using index \\"JoinRequests_pkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_pkey\\" PRIMARY KEY using index \\"Messages_pkey\\"","alter table \\"public\\".\\"Shoes\\" add constraint \\"shoes_pkey\\" PRIMARY KEY using index \\"shoes_pkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_pkey\\" PRIMARY KEY using index \\"Wishlist_pkey\\"","alter table \\"public\\".\\"Accessories\\" add constraint \\"Accessories_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Accessories\\" validate constraint \\"Accessories_itemId_fkey\\"","alter table \\"public\\".\\"CalendarDates\\" add constraint \\"CalendarDates_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) not valid","alter table \\"public\\".\\"CalendarDates\\" validate constraint \\"CalendarDates_userId_fkey\\"","alter table \\"public\\".\\"Clothing\\" add constraint \\"clothing_itemid_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Clothing\\" validate constraint \\"clothing_itemid_fkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_userId_1_fkey\\" FOREIGN KEY (\\"userId_1\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Conversations\\" validate constraint \\"Conversations_userId_1_fkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_userId_2_fkey\\" FOREIGN KEY (\\"userId_2\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Conversations\\" validate constraint \\"Conversations_userId_2_fkey\\"","alter table \\"public\\".\\"Groups\\" add constraint \\"groups_ambassadorid_fkey\\" FOREIGN KEY (\\"ambassadorId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"Groups\\" validate constraint \\"groups_ambassadorid_fkey\\"","alter table \\"public\\".\\"ItemConversions\\" add constraint \\"ItemConversions_name_key\\" UNIQUE using index \\"ItemConversions_name_key\\"","alter table \\"public\\".\\"Items\\" add constraint \\"Items_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Items\\" validate constraint \\"Items_userId_fkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_groupId_fkey\\" FOREIGN KEY (\\"groupId\\") REFERENCES \\"Groups\\"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"JoinRequests\\" validate constraint \\"JoinRequests_groupId_fkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"JoinRequests\\" validate constraint \\"JoinRequests_userId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_conversationId_fkey\\" FOREIGN KEY (\\"conversationId\\") REFERENCES \\"Conversations\\"(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_conversationId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_itemId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_senderId_fkey\\" FOREIGN KEY (\\"senderId\\") REFERENCES auth.users(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_senderId_fkey\\"","alter table \\"public\\".\\"Shoes\\" add constraint \\"shoes_itemid_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Shoes\\" validate constraint \\"shoes_itemid_fkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Wishlist\\" validate constraint \\"Wishlist_itemId_fkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Wishlist\\" validate constraint \\"Wishlist_userId_fkey\\"","set check_function_bodies = off","CREATE OR REPLACE FUNCTION public.handle_new_user()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nbegin\n  insert into public.users (id)\n  values (new.id);\n  return new;\nend;\n$function$","grant delete on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant references on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant select on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant update on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Items\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Items\\" to \\"anon\\"","grant references on table \\"public\\".\\"Items\\" to \\"anon\\"","grant select on table \\"public\\".\\"Items\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"anon\\"","grant update on table \\"public\\".\\"Items\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant references on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant select on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant update on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"service_role\\""}	remote_schema
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: Accessories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Accessories_id_seq"', 1, false);


--
-- Name: CalendarDates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CalendarDates_id_seq"', 1, false);


--
-- Name: Clothing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Clothing_id_seq"', 2, true);


--
-- Name: Conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Conversations_id_seq"', 1, true);


--
-- Name: Groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Groups_id_seq"', 1, true);


--
-- Name: ItemConversions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ItemConversions_id_seq"', 3, true);


--
-- Name: Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Items_id_seq"', 7, true);


--
-- Name: JoinRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."JoinRequests_id_seq"', 2, true);


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 2, true);


--
-- Name: Shoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Shoes_id_seq"', 5, true);


--
-- Name: Wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Wishlist_id_seq"', 5, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

