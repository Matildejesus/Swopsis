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
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.tenants (id, name, external_id, jwt_secret, max_concurrent_users, inserted_at, updated_at, max_events_per_second, postgres_cdc_default, max_bytes_per_second, max_channels_per_client, max_joins_per_second, suspend, jwt_jwks, notify_private_alpha, private_only, migrations_ran, broadcast_adapter) FROM stdin;
4ee4a4fc-6599-4cfb-8344-fc035dc646c1	realtime-dev	realtime-dev	iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==	200	2025-07-21 06:38:58	2025-07-21 06:38:58	100	postgres_cdc_rls	100000	100	100	f	{"keys": [{"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}	f	f	62	gen_rpc
\.


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.extensions (id, type, settings, tenant_external_id, inserted_at, updated_at) FROM stdin;
4c8f2bae-3ba0-4854-977b-df78136f1c04	postgres_cdc_rls	{"region": "us-east-1", "db_host": "428UEv1pL/VySHdenknFcydtSzQTdOar0PtjOJb3EAg=", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}	realtime-dev	2025-07-21 06:38:58	2025-07-21 06:38:58
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY _realtime.schema_migrations (version, inserted_at) FROM stdin;
20210706140551	2025-07-21 06:38:15
20220329161857	2025-07-21 06:38:15
20220410212326	2025-07-21 06:38:15
20220506102948	2025-07-21 06:38:15
20220527210857	2025-07-21 06:38:15
20220815211129	2025-07-21 06:38:15
20220815215024	2025-07-21 06:38:15
20220818141501	2025-07-21 06:38:15
20221018173709	2025-07-21 06:38:15
20221102172703	2025-07-21 06:38:15
20221223010058	2025-07-21 06:38:15
20230110180046	2025-07-21 06:38:15
20230810220907	2025-07-21 06:38:15
20230810220924	2025-07-21 06:38:15
20231024094642	2025-07-21 06:38:15
20240306114423	2025-07-21 06:38:15
20240418082835	2025-07-21 06:38:15
20240625211759	2025-07-21 06:38:15
20240704172020	2025-07-21 06:38:15
20240902173232	2025-07-21 06:38:15
20241106103258	2025-07-21 06:38:15
20250424203323	2025-07-21 06:38:15
20250613072131	2025-07-21 06:38:15
20250711044927	2025-07-21 06:38:15
\.


--
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" (id, created_at, "userId", category, image, title, description, method, available, "tradeCount", "unavailableDates") FROM stdin;
6	2025-07-23 10:52:11.202098+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	Shoes	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/0FD74DB1-265E-4C25-A9F0-EB8CE573D713.jpg	YSL Heels	sleek, red and pretty	swap	t	0	\N
7	2025-07-24 02:46:46.861519+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Clothing	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/9967797B-7299-43B4-AAA6-5C40FB087D65.jpg	Red Blouse	tight fitting, perfect for an event	loan	t	0	{"2025-07-23": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-25": {"marked": true, "dotColor": "red", "selected": true}, "2025-07-28": {"marked": true, "dotColor": "red", "selected": true}}
\.


--
-- Data for Name: Accessories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Accessories" (id, created_at, "itemId", subcategory, weight, material, condition, color) FROM stdin;
\.


--
-- Data for Name: CalendarDates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CalendarDates" (id, created_at, "userId", item, "itemType", dates) FROM stdin;
\.


--
-- Data for Name: Clothing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Clothing" (id, created_at, "itemId", subcategory, size, weight, fabric, condition, color) FROM stdin;
2	2025-07-24 02:46:46.968969+00	7	Shirt - Button Up Short	S	0.2	Wool	rarely-worn	#FFD700
\.


--
-- Data for Name: Conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Conversations" (id, created_at, "userId_1", "userId_2") FROM stdin;
1	2025-07-24 03:01:57.623634+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	fc65b6f1-6b7f-49af-9c99-ee3f06de3591
\.


--
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Groups" (id, created_at, "ambassadorId", name, description, location, "numberOfMem", avatar, status, rules) FROM stdin;
1	2025-07-21 12:21:26.540824+00	ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	QVM Squad	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet felis id felis laoreet, sollicitudin sodales est facilisis. Aliquam ornare turpis sit amet justo ullamcorper, at facilisis turp.	Melbourne, 3000	1	file:///Users/macbookair/Library/Developer/CoreSimulator/Devices/0C6DC8A4-2145-4B06-8043-1E79A598AE8A/data/Containers/Data/Application/63E15B48-A40C-405C-90C0-3BB2BEC1CE43/Library/Caches/ExponentExperienceData/@matildejesus/swopsis/ImagePicker/927023E0-4FF0-4187-BD90-341E1CEF2C38.jpg	approve	{Rgrgrgrgr,"Aliquam ornare turpis sit amet justo ullamcorper, at facilisis turpis pharetra.","Suspendisse non augue eget diam viverra ornare auctor non leo."}
\.


--
-- Data for Name: ItemConversions; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- Data for Name: JoinRequests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JoinRequests" (id, created_at, "userId", "groupId", message, status) FROM stdin;
1	2025-07-21 13:13:57.793398+00	68c1c652-43a4-4882-b89d-6550a16a5b5e	1	I would love to join	Accepted
2	2025-07-22 06:08:20.185849+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	1	Fdfdf	Accepted
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Messages" (id, created_at, "conversationId", "senderId", text, "itemId", "loanDates", "messageType", decision) FROM stdin;
1	2025-07-24 03:01:57.676045+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	\N	6	{}	calendar	\N
2	2025-07-24 03:01:57.713296+00	1	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	Fdfdfdf	\N	\N	text	\N
\.


--
-- Data for Name: Shoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Shoes" (id, created_at, "itemId", subcategory, size, weight, fabric, shoelength, condition, color) FROM stdin;
5	2025-07-23 10:52:11.319724+00	6	Heels	7	0.8	polyester	short	rarely-worn	#FFC0CB
\.


--
-- Data for Name: Wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wishlist" (id, created_at, "userId", "itemId") FROM stdin;
5	2025-07-24 03:01:27.415178+00	fc65b6f1-6b7f-49af-9c99-ee3f06de3591	6
\.


--
-- Data for Name: messages_2025_07_20; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_07_20 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_21; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_07_21 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_22; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_07_22 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_23; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_07_23 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_07_24; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_07_24 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
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
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
avatars	avatars	\N	2025-07-23 01:26:42.564435+00	2025-07-23 01:26:42.564435+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.iceberg_namespaces (id, bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.iceberg_tables (id, namespace_id, bucket_id, name, location, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-07-21 06:38:30.324415
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-07-21 06:38:30.326554
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-07-21 06:38:30.327246
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-07-21 06:38:30.332457
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-07-21 06:38:30.338719
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-07-21 06:38:30.339393
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-07-21 06:38:30.340548
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-07-21 06:38:30.341499
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-07-21 06:38:30.341908
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-07-21 06:38:30.342535
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-07-21 06:38:30.343281
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-07-21 06:38:30.344344
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-07-21 06:38:30.345538
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-07-21 06:38:30.346331
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-07-21 06:38:30.347532
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-07-21 06:38:30.365289
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-07-21 06:38:30.366876
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-07-21 06:38:30.368939
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-07-21 06:38:30.370787
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-07-21 06:38:30.373698
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-07-21 06:38:30.375704
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-07-21 06:38:30.378216
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-07-21 06:38:30.392598
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-07-21 06:38:30.399682
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-07-21 06:38:30.400816
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-07-21 06:38:30.402405
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-07-21 06:38:30.404166
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-07-21 06:38:30.409111
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-07-21 06:38:30.412794
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-07-21 06:38:30.41385
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-07-21 06:38:30.414704
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-07-21 06:38:30.416085
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-07-21 06:38:30.417536
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-07-21 06:38:30.420909
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-07-21 06:38:30.421174
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-07-21 06:38:30.423771
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-07-21 06:38:30.424614
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-07-21 06:38:30.427188
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-07-21 06:38:30.428128
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
avatars	user_ca6cf2db-d1e7-41d0-a18a-cee77d54f4ac	2025-07-23 02:09:03.238086+00	2025-07-23 02:09:03.238086+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.hooks (id, hook_table_id, hook_name, created_at, request_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY supabase_functions.migrations (version, inserted_at) FROM stdin;
initial	2025-07-21 06:38:01.194068+00
20210809183423_update_grants	2025-07-21 06:38:01.194068+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250227033148	{"create table \\"public\\".\\"Accessories\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"weight\\" text not null,\n    \\"material\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"CalendarDates\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"item\\" text not null,\n    \\"itemType\\" text not null,\n    \\"dates\\" jsonb not null\n)","alter table \\"public\\".\\"CalendarDates\\" enable row level security","create table \\"public\\".\\"Clothing\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"size\\" text not null,\n    \\"weight\\" text not null,\n    \\"fabric\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"Conversations\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId_1\\" uuid,\n    \\"userId_2\\" uuid\n)","create table \\"public\\".\\"Groups\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"ambassadorId\\" uuid not null,\n    \\"name\\" text not null,\n    \\"description\\" text not null,\n    \\"location\\" text not null,\n    \\"rules\\" text not null,\n    \\"numberOfMem\\" bigint not null,\n    \\"avatar\\" text not null\n)","create table \\"public\\".\\"ItemConversions\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"name\\" text not null,\n    \\"litres\\" bigint not null,\n    \\"carbon\\" double precision not null,\n    \\"scalable\\" boolean not null,\n    \\"category\\" text\n)","create table \\"public\\".\\"Items\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"category\\" text not null,\n    \\"image\\" text not null,\n    \\"title\\" text not null,\n    \\"description\\" text not null,\n    \\"method\\" text not null,\n    \\"available\\" boolean not null default true,\n    \\"tradeCount\\" bigint default '0'::bigint,\n    \\"unavailableDates\\" jsonb\n)","create table \\"public\\".\\"JoinRequests\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid not null,\n    \\"groupId\\" bigint not null,\n    \\"message\\" text not null default ''::text,\n    \\"status\\" text not null default 'Pending'::text\n)","create table \\"public\\".\\"Messages\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"conversationId\\" bigint not null,\n    \\"senderId\\" uuid not null,\n    \\"text\\" text,\n    \\"itemId\\" bigint,\n    \\"loanDates\\" jsonb default 'null'::jsonb,\n    \\"messageType\\" text not null,\n    \\"decision\\" text\n)","create table \\"public\\".\\"Shoes\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"itemId\\" bigint not null,\n    \\"subcategory\\" text not null,\n    \\"size\\" text not null,\n    \\"weight\\" text not null,\n    \\"fabric\\" text not null,\n    \\"shoelength\\" text not null,\n    \\"condition\\" text not null,\n    \\"color\\" text not null\n)","create table \\"public\\".\\"Wishlist\\" (\n    \\"id\\" bigint generated by default as identity not null,\n    \\"created_at\\" timestamp with time zone not null default now(),\n    \\"userId\\" uuid,\n    \\"itemId\\" bigint\n)","CREATE UNIQUE INDEX \\"Accessories_pkey\\" ON public.\\"Accessories\\" USING btree (id)","CREATE UNIQUE INDEX \\"CalendarDates_pkey\\" ON public.\\"CalendarDates\\" USING btree (id)","CREATE UNIQUE INDEX \\"Conversations_pkey\\" ON public.\\"Conversations\\" USING btree (id)","CREATE UNIQUE INDEX \\"ItemConversions_name_key\\" ON public.\\"ItemConversions\\" USING btree (name)","CREATE UNIQUE INDEX \\"ItemConversions_pkey\\" ON public.\\"ItemConversions\\" USING btree (id)","CREATE UNIQUE INDEX \\"Items_pkey\\" ON public.\\"Items\\" USING btree (id)","CREATE UNIQUE INDEX \\"JoinRequests_pkey\\" ON public.\\"JoinRequests\\" USING btree (id)","CREATE UNIQUE INDEX \\"Messages_pkey\\" ON public.\\"Messages\\" USING btree (id)","CREATE UNIQUE INDEX \\"Wishlist_pkey\\" ON public.\\"Wishlist\\" USING btree (id)","CREATE UNIQUE INDEX clothing_pkey ON public.\\"Clothing\\" USING btree (id)","CREATE UNIQUE INDEX groups_pkey ON public.\\"Groups\\" USING btree (id)","CREATE UNIQUE INDEX shoes_pkey ON public.\\"Shoes\\" USING btree (id)","alter table \\"public\\".\\"Accessories\\" add constraint \\"Accessories_pkey\\" PRIMARY KEY using index \\"Accessories_pkey\\"","alter table \\"public\\".\\"CalendarDates\\" add constraint \\"CalendarDates_pkey\\" PRIMARY KEY using index \\"CalendarDates_pkey\\"","alter table \\"public\\".\\"Clothing\\" add constraint \\"clothing_pkey\\" PRIMARY KEY using index \\"clothing_pkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_pkey\\" PRIMARY KEY using index \\"Conversations_pkey\\"","alter table \\"public\\".\\"Groups\\" add constraint \\"groups_pkey\\" PRIMARY KEY using index \\"groups_pkey\\"","alter table \\"public\\".\\"ItemConversions\\" add constraint \\"ItemConversions_pkey\\" PRIMARY KEY using index \\"ItemConversions_pkey\\"","alter table \\"public\\".\\"Items\\" add constraint \\"Items_pkey\\" PRIMARY KEY using index \\"Items_pkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_pkey\\" PRIMARY KEY using index \\"JoinRequests_pkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_pkey\\" PRIMARY KEY using index \\"Messages_pkey\\"","alter table \\"public\\".\\"Shoes\\" add constraint \\"shoes_pkey\\" PRIMARY KEY using index \\"shoes_pkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_pkey\\" PRIMARY KEY using index \\"Wishlist_pkey\\"","alter table \\"public\\".\\"Accessories\\" add constraint \\"Accessories_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Accessories\\" validate constraint \\"Accessories_itemId_fkey\\"","alter table \\"public\\".\\"CalendarDates\\" add constraint \\"CalendarDates_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) not valid","alter table \\"public\\".\\"CalendarDates\\" validate constraint \\"CalendarDates_userId_fkey\\"","alter table \\"public\\".\\"Clothing\\" add constraint \\"clothing_itemid_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Clothing\\" validate constraint \\"clothing_itemid_fkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_userId_1_fkey\\" FOREIGN KEY (\\"userId_1\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Conversations\\" validate constraint \\"Conversations_userId_1_fkey\\"","alter table \\"public\\".\\"Conversations\\" add constraint \\"Conversations_userId_2_fkey\\" FOREIGN KEY (\\"userId_2\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Conversations\\" validate constraint \\"Conversations_userId_2_fkey\\"","alter table \\"public\\".\\"Groups\\" add constraint \\"groups_ambassadorid_fkey\\" FOREIGN KEY (\\"ambassadorId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"Groups\\" validate constraint \\"groups_ambassadorid_fkey\\"","alter table \\"public\\".\\"ItemConversions\\" add constraint \\"ItemConversions_name_key\\" UNIQUE using index \\"ItemConversions_name_key\\"","alter table \\"public\\".\\"Items\\" add constraint \\"Items_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Items\\" validate constraint \\"Items_userId_fkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_groupId_fkey\\" FOREIGN KEY (\\"groupId\\") REFERENCES \\"Groups\\"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"JoinRequests\\" validate constraint \\"JoinRequests_groupId_fkey\\"","alter table \\"public\\".\\"JoinRequests\\" add constraint \\"JoinRequests_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid","alter table \\"public\\".\\"JoinRequests\\" validate constraint \\"JoinRequests_userId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_conversationId_fkey\\" FOREIGN KEY (\\"conversationId\\") REFERENCES \\"Conversations\\"(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_conversationId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_itemId_fkey\\"","alter table \\"public\\".\\"Messages\\" add constraint \\"Messages_senderId_fkey\\" FOREIGN KEY (\\"senderId\\") REFERENCES auth.users(id) not valid","alter table \\"public\\".\\"Messages\\" validate constraint \\"Messages_senderId_fkey\\"","alter table \\"public\\".\\"Shoes\\" add constraint \\"shoes_itemid_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Shoes\\" validate constraint \\"shoes_itemid_fkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_itemId_fkey\\" FOREIGN KEY (\\"itemId\\") REFERENCES \\"Items\\"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Wishlist\\" validate constraint \\"Wishlist_itemId_fkey\\"","alter table \\"public\\".\\"Wishlist\\" add constraint \\"Wishlist_userId_fkey\\" FOREIGN KEY (\\"userId\\") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid","alter table \\"public\\".\\"Wishlist\\" validate constraint \\"Wishlist_userId_fkey\\"","set check_function_bodies = off","CREATE OR REPLACE FUNCTION public.handle_new_user()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nbegin\n  insert into public.users (id)\n  values (new.id);\n  return new;\nend;\n$function$","grant delete on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Accessories\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"anon\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant references on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant select on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant update on table \\"public\\".\\"CalendarDates\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Clothing\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Conversations\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant references on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant select on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant update on table \\"public\\".\\"Groups\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Groups\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Groups\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"anon\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant references on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant select on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant update on table \\"public\\".\\"ItemConversions\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Items\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Items\\" to \\"anon\\"","grant references on table \\"public\\".\\"Items\\" to \\"anon\\"","grant select on table \\"public\\".\\"Items\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"anon\\"","grant update on table \\"public\\".\\"Items\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Items\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Items\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"anon\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant references on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant select on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant update on table \\"public\\".\\"JoinRequests\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant references on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant select on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant update on table \\"public\\".\\"Messages\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Messages\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Messages\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Shoes\\" to \\"service_role\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"anon\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant references on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant select on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"Wishlist\\" to \\"service_role\\"","grant update on table \\"public\\".\\"Wishlist\\" to \\"service_role\\""}	remote_schema
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: Accessories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Accessories_id_seq"', 1, false);


--
-- Name: CalendarDates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CalendarDates_id_seq"', 1, false);


--
-- Name: Clothing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clothing_id_seq"', 2, true);


--
-- Name: Conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Conversations_id_seq"', 1, true);


--
-- Name: Groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Groups_id_seq"', 1, true);


--
-- Name: ItemConversions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ItemConversions_id_seq"', 3, true);


--
-- Name: Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_id_seq"', 7, true);


--
-- Name: JoinRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."JoinRequests_id_seq"', 2, true);


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 2, true);


--
-- Name: Shoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Shoes_id_seq"', 5, true);


--
-- Name: Wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Wishlist_id_seq"', 5, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

