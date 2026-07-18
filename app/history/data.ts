/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: History Page, Data
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { HistorySection, TocItem } from "./type";

export const PAGE_EYEBROW = "Background";

export const PAGE_HEADING =
  "How diabetes works, and how we figured any of this out";

export const PAGE_INTRO =
  "Diabetes is not a modern invention. People have been writing down something very like it for over three thousand years, long before anyone understood what was actually happening inside the body. This page starts with the mechanics, what's actually going wrong when blood sugar stays high, and then walks through how we got from ancient guesswork to insulin pens and sensors worn on the arm.";

export const PAGE_WATERMARK = "RESEARCH";

export const PAGE_BLURB =
  "The science and history behind diabetes and its treatment.";

export const TOC_ITEMS: TocItem[] = [
  { id: "mechanism", label: "How diabetes works in the body" },
  {
    id: "ancient",
    label: "The ancient world: three civilizations, the same mystery",
  },
  { id: "willis", label: "A doctor tastes the evidence" },
  { id: "pancreas", label: "Finding the source: the pancreas" },
  { id: "insulin", label: "The discovery of insulin" },
  { id: "scaling", label: "Scaling it up, and making it last longer" },
  { id: "pills", label: "The first pills" },
  { id: "monitoring", label: "From urine strips to a number on demand" },
  { id: "pumps", label: "Pumps, pens, and tighter control" },
  { id: "cgm", label: "Continuous monitoring and closing the loop" },
];

export const HISTORY_SECTIONS: HistorySection[] = [
  {
    id: "mechanism",
    when: null,
    title: "How diabetes works in the body",
    paragraphs: [
      "Every time you eat, your digestive system breaks carbohydrates down into glucose, a simple sugar, which then passes into your bloodstream. That glucose is fuel. Your muscles, brain, and organs all need it to function, but it can't just drift out of the blood and into a cell on its own. Most cells in the body are effectively locked, and glucose needs a key to get in. That key is insulin.",
      "Insulin is made by beta cells, which sit in small clusters inside the pancreas called islets. When blood glucose rises after a meal, beta cells sense it and release insulin into the bloodstream. Insulin then travels to muscle and fat cells and binds to insulin receptors on their surface. That binding sets off a chain of signals inside the cell that tells it to move a transport protein called GLUT4 up to the cell's outer membrane. GLUT4 acts like a channel or door: once it's in place, glucose can flow through it and out of the blood, into the cell, where it gets used for energy or stored for later. As glucose moves out of the bloodstream and into cells, blood sugar levels fall back toward normal. The liver plays a role too, both storing glucose as glycogen when supply is high and releasing it back into the blood when levels drop, keeping the whole system balanced through the day.",
      "Diabetes happens when this system breaks down, but type 1 and type 2 break it in very different ways. In type 1 diabetes, the immune system mistakenly identifies the pancreas's own beta cells as a threat and destroys them. This is an autoimmune process, similar in principle to how the immune system might attack a virus, except the target here is the body's own insulin-producing tissue. Over time, usually months to years, enough beta cells are destroyed that the pancreas can no longer produce meaningful amounts of insulin. Without insulin, the key is gone: glucose builds up in the blood because it has no way to get into most cells, no matter how much is circulating. People with type 1 diabetes need to replace that missing insulin from outside the body, for life.",
      "Type 2 diabetes works differently. Here, the pancreas usually still makes insulin, often in large amounts, but the body's cells stop responding to it properly. This is called insulin resistance: the key still exists, but the locks have gotten stiff. Muscle and fat cells need more and more insulin to move the same amount of glucose out of the blood. In the early stages, the pancreas compensates by producing extra insulin to overcome that resistance, and blood sugar can stay in a fairly normal range for a long time. But beta cells under that kind of constant extra demand tend to wear out gradually, and insulin production eventually starts to fall short of what's needed. At that point, blood glucose starts climbing because there isn't enough effective insulin action to clear it, even though some insulin is still present. The liver compounds the problem in type 2 diabetes as well, often releasing more glucose into the blood than it should, even when levels are already high, because it too has become less responsive to insulin's signal to slow down.",
      "Left elevated, that extra sugar in the blood doesn't just sit there quietly. High glucose levels are chemically damaging to blood vessels and nerves over time, which is why long-term uncontrolled diabetes is linked to problems in the eyes, kidneys, nerves, and heart. In the short term, very high blood sugar combined with very low insulin, most often in type 1 diabetes, can lead to a dangerous condition called diabetic ketoacidosis, where the body, unable to use glucose for fuel, starts breaking down fat instead and produces acidic byproducts called ketones. That's part of why insulin isn't optional for someone whose pancreas can't produce it: without it, the body is quite literally starving at the cellular level while surrounded by more fuel than it can use.",
    ],
    callout:
      "In short: type 1 is a missing key. Type 2 starts as a stiff lock, and can progress to a shortage of keys as well. Both end with the same basic result, glucose that can't get where it needs to go, and stays in the blood instead.",
  },
  {
    id: "ancient",
    when: "c. 1550 BCE to 400 BCE",
    title: "The ancient world: three civilizations, the same mystery",
    paragraphs: [
      "Long before anyone understood insulin or glucose, physicians in different parts of the world independently noticed the same strange cluster of symptoms: extreme thirst, frequent urination, and a body that seemed to waste away no matter how much a person ate. The earliest surviving written account comes from Egypt. A medical text known today as the Ebers Papyrus, dated to around 1550 BCE, describes a condition involving excessive, frequent urination, alongside a long list of other ailments and remedies. It's the oldest known record of the core symptom that would eventually give the disease its name, even though the Egyptians had no framework for understanding what was causing it.",
      "Around the same general era, physicians in ancient India made a more specific and, in hindsight, remarkably clever observation. Sushruta and Charaka, two of the foundational figures in early Indian medicine, described a condition they called madhumeha, which translates roughly to honey urine. They noticed that the urine of some patients attracted ants and flies, and some accounts describe physicians tasting the urine directly to check for sweetness as part of diagnosis. Without knowing anything about glucose molecules, they had effectively discovered that this illness caused sugar to spill into urine, and they used that observation as a diagnostic test centuries before laboratory chemistry existed. Sushruta is also credited with noting that the disease appeared to run in families and seemed connected to diet and body weight in some patients, an early and surprisingly accurate hint at what we'd now separate out as type 2 diabetes.",
      "It's a Greek physician, however, who gave the disease the name we still use. Aretaeus of Cappadocia, writing sometime between roughly 230 BCE and 200 CE depending on the source, described patients whose bodies seemed to melt down into urine, as though flesh and limbs were being converted directly into water and passed out of the body. He named the condition diabetes, from a Greek word meaning siphon or to pass through, capturing the sense that liquid seemed to flow through these patients almost as quickly as they could drink it. Aretaeus reportedly considered the disease rare but devastating, and by his own account, offered little hope for recovery once it took hold.",
    ],
    callout: null,
  },
  {
    id: "willis",
    when: "1670s",
    title: "A doctor tastes the evidence",
    paragraphs: [
      "For well over a thousand years after Aretaeus, diabetes remained a name for a set of symptoms rather than a disease anyone could explain. That began to shift, in an unglamorous but important way, with English physician Thomas Willis in the 1670s. Willis is generally credited with confirming, in a European medical context, that the urine of diabetic patients tasted distinctly sweet. Accounts of exactly how thorough his personal testing was vary, but the observation itself stuck, and it mattered: it distinguished this type of excessive urination from other conditions that caused similar symptoms but without the sweetness, such as what we'd now recognize as diabetes insipidus, an entirely different and unrelated disorder that happens to share the name.",
      "To mark the distinction, Willis added the word mellitus, Latin for honey or sweetened with honey, giving us the full name diabetes mellitus that's still used today in medical contexts. It's a small linguistic detail, but it reflects something important about how medicine progressed here: for centuries, taste and direct observation were the only diagnostic tools available, and physicians built real, transferable knowledge from them long before anyone could explain the underlying chemistry.",
    ],
    callout: null,
  },
  {
    id: "pancreas",
    when: "1869 to 1889",
    title: "Finding the source: the pancreas",
    paragraphs: [
      "The next two centuries brought better anatomical understanding of the body generally, but diabetes remained mysterious in terms of cause. A meaningful clue came in 1869, when a German medical student named Paul Langerhans, examining pancreatic tissue under a microscope as part of his doctoral work, noticed small clusters of cells scattered through the organ that looked structurally different from the surrounding tissue. He described them without knowing what they did. Decades later, these clusters would be named islets of Langerhans in his honor, and we now know them as the site where insulin-producing beta cells actually live.",
      "The real breakthrough connecting the pancreas to diabetes came in 1889, somewhat by accident. Two researchers, Oskar Minkowski and Joseph von Mering, were studying digestion and wanted to see what would happen if a dog's pancreas were surgically removed. The experiment had nothing to do with diabetes at the outset. But shortly after the surgery, a lab assistant reportedly noticed that the dog's urine was attracting swarms of flies, exactly the kind of observation Indian physicians had made over a thousand years earlier. Testing confirmed the urine was loaded with sugar, and the dog rapidly developed the full set of classic diabetes symptoms: extreme thirst, frequent urination, and rapid weight loss. Removing the pancreas alone was enough to cause the disease. This was the first solid experimental evidence, rather than mere clinical observation, that the pancreas was central to regulating blood sugar, and it set off a race among researchers to figure out exactly what substance the pancreas was producing that made the difference.",
    ],
    callout: null,
  },
  {
    id: "insulin",
    when: "1921 to 1922",
    title: "The discovery of insulin",
    paragraphs: [
      "For the three decades after Minkowski and von Mering's experiment, researchers understood that the pancreas held the answer but repeatedly failed to isolate whatever it was producing, largely because the pancreas's own digestive enzymes tended to destroy the active substance during extraction. The breakthrough came at the University of Toronto in 1921, driven initially by a Canadian surgeon named Frederick Banting, who had a specific idea for getting around the enzyme problem: tying off the pancreatic duct in dogs first, letting the digestive portion of the gland wither away, and then extracting fluid from what remained, which he suspected would preserve the substance he was after.",
      "Banting brought the idea to physiologist John Macleod at the University of Toronto, who was initially skeptical but provided lab space, a research assistant named Charles Best, and a colony of dogs for the summer of 1921. Banting and Best successfully extracted a substance from the withered pancreatic tissue and showed it could lower blood sugar in diabetic dogs. The extract, however, was too impure and inconsistent to use safely in humans. That's where biochemist James Collip came in, joining the team to refine the purification process to a point where the extract was clean enough for human use.",
      "In January 1922, a fourteen-year-old patient named Leonard Thompson, gravely ill with type 1 diabetes at Toronto General Hospital, became the first person treated with insulin. An initial injection produced a poor result and an allergic reaction, but an improved, more purified batch from Collip given shortly after brought his dangerously high blood sugar down dramatically and improved his condition almost immediately. It was, for all practical purposes, the first time in history that a diagnosis of type 1 diabetes was not simply a death sentence. Before this, most patients diagnosed with what we'd now call type 1 diabetes died within a year or two of onset, often on physician-prescribed near-starvation diets that could delay but never prevent the outcome. Banting and Macleod received the Nobel Prize in Physiology or Medicine in 1923 for the discovery, a decision that was controversial at the time, since Banting felt strongly that Best deserved equal credit and Macleod felt Collip's contribution had been undervalued. Both men ended up sharing their prize money with their respective collaborators.",
    ],
    callout: null,
  },
  {
    id: "scaling",
    when: "1922 to the 1970s",
    title: "Scaling it up, and making it last longer",
    paragraphs: [
      "A scientific discovery is not the same thing as a treatment available to the public, and the team at Toronto knew it. Within the same year insulin was successfully used in a patient, the University of Toronto partnered with the pharmaceutical company Eli Lilly to begin mass-producing insulin extracted from cow and pig pancreases, since human insulin obviously couldn't be harvested at any usable scale. This animal-derived insulin remained the standard treatment for diabetes for the next six decades.",
      "Early insulin had a significant practical drawback: it acted quickly but wore off quickly too, meaning patients often needed several injections spaced through the day. Over the following decades, researchers developed longer-acting formulations, by combining insulin with substances like protamine and zinc that slowed its absorption into the bloodstream, letting a single injection cover many more hours. These intermediate and long-acting insulins, developed largely from the 1930s through the 1950s, meant patients could often get by with one or two injections a day instead of four or more, a substantial quality-of-life improvement even though the insulin itself still came from animals.",
      "The next major leap came with the biotechnology revolution of the late 1970s. In 1978, researchers succeeded in using genetically engineered bacteria to produce human insulin directly, rather than extracting a similar but not identical animal version. Eli Lilly brought this recombinant human insulin to market in 1982 under the brand name Humulin, making it the first genetically engineered drug ever approved for human use. This mattered beyond convenience: some patients developed allergic reactions or resistance to animal-derived insulin over years of use, and human-identical insulin sidestepped that problem almost entirely, while also removing any dependence on animal pancreas supply.",
    ],
    callout: null,
  },
  {
    id: "pills",
    when: "1950s to 1994",
    title: "The first pills",
    paragraphs: [
      "Insulin transformed type 1 diabetes, but not everyone with diabetes needs injected insulin, particularly in the earlier stages of type 2 diabetes, where the problem is more about insulin resistance than an outright absence of insulin. This opened space for oral medications working through different mechanisms entirely.",
      "One of the most widely used diabetes medications today, metformin, has a genuinely old backstory. It's derived from a compound found in the French lilac plant, which had been used in folk medicine for centuries for symptoms resembling diabetes. French physician Jean Sterne is generally credited with the modern development of metformin, publishing research on its use in diabetes patients in 1957, and it became available in parts of Europe not long after. The United States, however, was notably slow to approve it: metformin wasn't approved for use in the U.S. until 1994, decades after it was already standard treatment elsewhere, due in part to caution stemming from serious side effects seen in a related, since-discontinued compound. Today metformin works primarily by reducing the amount of glucose the liver releases into the blood and improving the body's sensitivity to the insulin it already has, rather than by increasing insulin production directly.",
      "A separate class of medications, sulfonylureas, took a different approach, directly stimulating the pancreas's beta cells to release more insulin. These were developed and introduced starting in the 1950s as well, and along with metformin, formed the backbone of oral type 2 diabetes treatment for decades before newer drug classes, targeting things like incretin hormones and kidney glucose reabsorption, arrived in the 2000s and 2010s.",
    ],
    callout: null,
  },
  {
    id: "monitoring",
    when: "1900s to 1980s",
    title: "From urine strips to a number on demand",
    paragraphs: [
      "For most of the twentieth century, even after insulin became available, patients had no easy way to track their blood sugar day to day. The main tool was urine testing: chemical strips or tablets that changed color depending on how much sugar was present in a urine sample. This gave a rough, delayed picture at best, since sugar shows up in urine only once blood levels are already fairly high, and it tells you nothing about a low blood sugar episode, which produces no sugar in urine at all.",
      "The real shift toward direct, immediate feedback came with the development of blood glucose meters, starting around 1970 with early devices designed for doctors' offices and hospitals rather than home use. These reflectance meters measured how light bounced off a chemically treated strip after a drop of blood was applied. Through the later 1970s and into the 1980s, meters shrank, became more accurate, and dropped enough in price and complexity that patients could reasonably use them at home, checking their own blood sugar with a finger prick rather than waiting for a lab visit or relying on a delayed urine reading. This was arguably as significant for day-to-day diabetes management as any single drug development, because it gave patients, for the first time, the ability to see the direct effect of a meal, a walk, or a dose of insulin within minutes rather than guessing.",
      "Around the same period, doctors gained a complementary long-view tool: the hemoglobin A1c test, developed through the 1970s, which measures the percentage of red blood cells with sugar attached to them and gives a picture of average blood sugar control over roughly the preceding two to three months. Between a meter for the moment and an A1c test for the bigger picture, patients and doctors finally had a reasonably complete way to see both the immediate and the long-term state of blood sugar control.",
    ],
    callout: null,
  },
  {
    id: "pumps",
    when: "1970s to 1990s",
    title: "Pumps, pens, and tighter control",
    paragraphs: [
      "Multiple daily injections, even with improved long-acting insulin, still meant approximating what a healthy pancreas does automatically and continuously. Insulin pumps, first developed in prototype form in the 1970s, offered an alternative: a small device delivering a continuous trickle of fast-acting insulin under the skin, with the ability to add larger doses around meals. Early pumps were bulky, backpack-sized devices used mostly in research and hospital settings, but they steadily shrank over the following two decades into wearable devices patients could use daily, giving much finer control over insulin dosing than a fixed schedule of injections ever could.",
      "Around the same period, insulin pens arrived as a more practical alternative for patients who didn't want or need a pump, replacing a traditional syringe and vial with a pre-loaded, dial-a-dose device that made accurate, discreet injections considerably easier, particularly outside the home. Between pumps and pens, patients gained real flexibility in how precisely and conveniently they could match insulin delivery to their actual daily life, rather than shaping their day around a rigid injection schedule.",
    ],
    callout: null,
  },
  {
    id: "cgm",
    when: "2000s to present",
    title: "Continuous monitoring and closing the loop",
    paragraphs: [
      "Finger-prick meters were a major improvement, but they're still only a snapshot: a single number at a single moment, several times a day at best. Continuous glucose monitors, which reached the market in the early 2000s, changed that by using a small sensor placed just under the skin to measure glucose in the fluid between cells every few minutes, around the clock, and transmit it to a receiver or a phone. For the first time, patients and doctors could see not just a number, but a trend line: whether glucose was rising, falling, or holding steady, and how quickly.",
      "The most recent major step has been combining continuous monitoring with insulin pumps into what are generally called hybrid closed-loop systems, sometimes described informally as an artificial pancreas. These systems use real-time glucose data to automatically adjust background insulin delivery without the patient having to intervene constantly, and most became available commercially starting in the mid-2010s. They don't yet fully replicate a working pancreas, patients still typically need to announce meals for dosing purposes, but they represent the closest medicine has come to automating the moment-to-moment balancing act that a healthy pancreas performs without any conscious thought at all.",
      "Taken together, the arc runs from ancient physicians tasting urine to sense-and-respond systems capable of adjusting insulin delivery on their own, in roughly three and a half thousand years. Most of the meaningful acceleration happened in the last hundred, starting the moment insulin itself was finally isolated in a Toronto lab in the winter of 1921 and 1922.",
    ],
    callout: null,
  },
];

export const PAGE_FOOTER_NOTE =
  "Background reading only, not medical advice. Compiled from general medical history sources.";
