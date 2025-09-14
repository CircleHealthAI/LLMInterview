export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const sampleDocuments: Document[] = [
  {
    id: "doc-1",
    title: "The Future of Artificial Intelligence in Healthcare",
    content: `Artificial Intelligence (AI) is revolutionizing the healthcare industry in unprecedented ways. From diagnostic imaging to drug discovery, AI technologies are transforming how medical professionals approach patient care and treatment.

One of the most significant applications of AI in healthcare is in medical imaging. Machine learning algorithms can now analyze X-rays, MRIs, and CT scans with remarkable accuracy, often detecting anomalies that might be missed by human radiologists. This capability not only improves diagnostic accuracy but also speeds up the process, allowing for faster treatment decisions.

In the realm of drug discovery, AI is accelerating the identification of potential therapeutic compounds. Traditional drug development can take decades and cost billions of dollars. AI-powered systems can analyze vast molecular databases and predict which compounds are most likely to be effective against specific diseases, significantly reducing both time and cost.

Personalized medicine is another area where AI shows tremendous promise. By analyzing patient data, genetic information, and treatment histories, AI systems can help doctors tailor treatments to individual patients, improving outcomes and reducing adverse effects.

However, the integration of AI in healthcare also presents challenges. Privacy concerns, the need for regulatory approval, and ensuring AI systems are unbiased and reliable are all critical issues that must be addressed as this technology continues to evolve.

Despite these challenges, the potential benefits of AI in healthcare are enormous. As we continue to develop and refine these technologies, we can expect to see even more innovative applications that will ultimately improve patient care and save lives.`,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "doc-2",
    title: "Remote Work: Transforming the Modern Workplace",
    content: `The shift to remote work has fundamentally changed how we think about employment, productivity, and work-life balance. What began as a necessity during the pandemic has evolved into a permanent feature of the modern workplace.

Remote work offers numerous benefits for both employees and employers. Workers enjoy increased flexibility, reduced commuting time, and often better work-life balance. Companies can access a global talent pool, reduce office overhead costs, and often see improved employee satisfaction and retention rates.

However, remote work also presents unique challenges. Communication can become more difficult, team collaboration requires new tools and processes, and maintaining company culture becomes more complex. Some employees struggle with isolation or the blurred boundaries between home and work life.

Technology has been the great enabler of this transition. Video conferencing, cloud computing, project management tools, and collaborative platforms have made it possible for teams to work effectively from anywhere. As these technologies continue to improve, remote work becomes increasingly seamless.

The future likely holds a hybrid model for many organizations, combining the benefits of in-person collaboration with the flexibility of remote work. This approach requires thoughtful planning and clear policies to ensure all team members can contribute effectively regardless of their location.`,
    createdAt: "2024-01-16T14:20:00Z"
  },
  {
    id: "doc-3",
    title: "Sustainable Energy Solutions for Urban Development",
    content: `Cities consume approximately 78% of global energy and produce more than 60% of greenhouse gas emissions. As urban populations continue to grow, the need for sustainable energy solutions becomes increasingly critical for environmental and economic sustainability.

Solar power integration in urban environments has shown remarkable progress. Rooftop solar installations, building-integrated photovoltaics, and solar canopies over parking areas are becoming commonplace. Smart grid technology allows cities to efficiently distribute and manage renewable energy sources.

Energy-efficient building design is another crucial component. Green building standards like LEED and BREEAM promote the use of sustainable materials, improved insulation, and energy-efficient systems. Smart building technologies can optimize energy consumption through automated lighting, heating, and cooling systems.

Public transportation electrification represents a significant opportunity for urban sustainability. Electric buses, light rail systems, and charging infrastructure for electric vehicles can dramatically reduce transportation emissions while improving air quality.

District energy systems that serve multiple buildings can achieve greater efficiency than individual building systems. These systems can incorporate renewable energy sources, waste heat recovery, and energy storage to provide reliable, clean energy to urban areas.

The transition to sustainable urban energy requires collaboration between government, private sector, and communities. Policy incentives, public-private partnerships, and citizen engagement are all essential for successful implementation.`,
    createdAt: "2024-01-17T09:45:00Z"
  },
  {
    id: "doc-4",
    title: "The Psychology of Decision Making in Business",
    content: `Understanding how people make decisions is crucial for business success. Psychological research reveals that human decision-making is far from the rational process we might assume, involving emotions, biases, and mental shortcuts that can significantly impact business outcomes.

Cognitive biases play a major role in business decisions. Confirmation bias leads people to seek information that supports their existing beliefs, while anchoring bias causes overreliance on the first piece of information encountered. The availability heuristic makes recent or memorable events seem more likely to occur again.

Emotional factors are equally important in decision-making. Fear of loss often outweighs potential gains, leading to overly conservative choices. Social proof influences decisions as people look to others for guidance on what's appropriate or effective. Status quo bias maintains existing practices even when change might be beneficial.

Successful businesses leverage these psychological insights in their operations. Marketing strategies use scarcity and social proof to influence consumer behavior. Product design considers cognitive load and user psychology to improve user experience. Management practices account for motivation, engagement, and psychological safety.

Organizations can improve decision-making by implementing structured processes, diverse perspectives, and data-driven approaches. Creating psychological safety encourages honest feedback and reduces groupthink. Regular decision audits help identify patterns and improve future choices.

The field of behavioral economics continues to provide valuable insights for business applications, helping organizations make better decisions and better understand their customers and employees.`,
    createdAt: "2024-01-18T16:10:00Z"
  },
  {
    id: "doc-5",
    title: "Blockchain Technology Beyond Cryptocurrency",
    content: `While blockchain technology gained fame through cryptocurrencies like Bitcoin, its potential applications extend far beyond digital currencies. This distributed ledger technology offers transparency, security, and decentralization that can transform numerous industries.

Supply chain management is one of the most promising applications. Blockchain can provide end-to-end traceability of products, from raw materials to final delivery. This transparency helps combat counterfeiting, ensures product authenticity, and enables quick identification of issues like contaminated food products.

Healthcare data management can benefit significantly from blockchain's security features. Patient records stored on blockchain can be securely shared between healthcare providers while maintaining privacy and patient control. This could improve care coordination and medical research while protecting sensitive information.

Digital identity verification is another area where blockchain shows promise. Self-sovereign identity systems could give individuals control over their personal data while providing secure, verifiable credentials. This could streamline processes like loan applications, employment verification, and travel documentation.

Smart contracts, self-executing contracts with terms directly written into code, can automate many business processes. Insurance claims, real estate transactions, and supply chain payments could all be automated, reducing costs and processing time while minimizing disputes.

Voting systems built on blockchain could increase transparency and trust in democratic processes. The immutable nature of blockchain records could provide verifiable election results while maintaining voter privacy.

Despite these promising applications, blockchain technology faces challenges including scalability, energy consumption, and regulatory uncertainty. However, ongoing developments in blockchain technology continue to address these limitations.`,
    createdAt: "2024-01-19T11:30:00Z"
  },
  {
    id: "doc-6",
    title: "The Impact of Social Media on Mental Health",
    content: `Social media platforms have become integral to modern communication and information sharing, but their impact on mental health is complex and multifaceted. Research reveals both positive and negative effects that vary significantly among different user groups and usage patterns.

Positive aspects of social media include increased social connection, especially for isolated individuals or those with shared interests. Support groups, educational content, and creative expression opportunities can enhance well-being. Social media also provides platforms for mental health awareness and access to resources.

However, negative impacts are well-documented. Constant social comparison can lead to decreased self-esteem and increased anxiety. Fear of missing out (FOMO) drives compulsive checking behaviors. Cyberbullying and online harassment can cause significant psychological harm, particularly among young people.

The addictive nature of social media design contributes to problematic usage patterns. Features like infinite scroll, push notifications, and variable reward schedules are designed to maximize engagement, potentially leading to compulsive use that interferes with real-world activities and relationships.

Sleep disruption is another significant concern. Blue light exposure from screens can interfere with circadian rhythms, while the stimulating content and FOMO can make it difficult to disconnect before bedtime. Poor sleep quality directly impacts mental health and cognitive function.

Mitigating negative impacts requires both individual strategies and platform responsibility. Users can benefit from setting boundaries, curating their feeds, and practicing digital detoxes. Social media companies are increasingly implementing features to promote healthy usage patterns.

Mental health professionals are adapting their practices to address social media-related issues, developing new therapeutic approaches and screening tools to identify problematic usage patterns and their psychological consequences.`,
    createdAt: "2024-01-20T13:15:00Z"
  },
  {
    id: "doc-7",
    title: "Advanced Materials in Aerospace Engineering",
    content: `The aerospace industry continuously pushes the boundaries of materials science to achieve lighter, stronger, and more efficient aircraft and spacecraft. Advanced materials are essential for meeting the demanding requirements of flight, including extreme temperatures, high stress loads, and weight constraints.

Carbon fiber composites have revolutionized aircraft construction. These materials offer exceptional strength-to-weight ratios, corrosion resistance, and fatigue performance. Modern commercial aircraft like the Boeing 787 and Airbus A350 extensively use carbon fiber composites, achieving significant weight savings and improved fuel efficiency.

Titanium alloys remain crucial for high-temperature applications such as jet engines. These materials maintain strength at elevated temperatures while offering excellent corrosion resistance. Advanced titanium alloys and processing techniques continue to improve performance while reducing manufacturing costs.

Ceramic matrix composites (CMCs) represent the next generation of high-temperature materials. These materials can operate at temperatures higher than metal alloys while maintaining structural integrity. CMCs are being implemented in jet engine hot sections, enabling higher operating temperatures and improved efficiency.

Shape memory alloys offer unique properties that enable adaptive structures. These materials can change shape in response to temperature or electrical stimulus, allowing for morphing wing surfaces, deployable structures, and self-healing systems.

Additive manufacturing is transforming how aerospace materials are processed and used. 3D printing enables complex geometries impossible with traditional manufacturing, while also allowing for functionally graded materials and embedded sensors.

Nanotechnology is opening new possibilities in aerospace materials. Nanocomposites, nanocoatings, and nanostructured materials offer enhanced properties including improved thermal management, electromagnetic shielding, and self-sensing capabilities.

The future of aerospace materials involves smart materials that can adapt to changing conditions, self-repair damage, and provide real-time structural health monitoring.`,
    createdAt: "2024-01-21T08:45:00Z"
  },
  {
    id: "doc-8",
    title: "Personalized Medicine: The Future of Healthcare",
    content: `Personalized medicine represents a paradigm shift from traditional one-size-fits-all treatments to individualized therapies based on patient-specific characteristics. This approach considers genetic makeup, lifestyle factors, environmental exposures, and disease characteristics to optimize treatment outcomes.

Genomic sequencing has become the cornerstone of personalized medicine. The dramatic reduction in sequencing costs has made genetic testing accessible for routine clinical use. Pharmacogenomics helps predict how patients will respond to specific medications, reducing adverse reactions and improving treatment efficacy.

Precision oncology has shown remarkable success in cancer treatment. Tumor genetic profiling identifies specific mutations that can be targeted with precision therapies. Immunotherapy approaches are tailored based on individual immune system characteristics and tumor biology, leading to improved survival rates for many cancer types.

Biomarkers play a crucial role in personalized medicine by providing measurable indicators of biological processes, disease states, or treatment responses. Liquid biopsies can detect circulating tumor DNA, enabling early cancer detection and monitoring treatment progress without invasive procedures.

Artificial intelligence and machine learning enhance personalized medicine by analyzing vast amounts of patient data to identify patterns and predict treatment outcomes. These technologies can integrate genomic data, medical imaging, electronic health records, and real-time monitoring data to provide comprehensive patient insights.

Challenges in implementing personalized medicine include data privacy concerns, the need for diverse genetic databases, healthcare system integration, and ensuring equitable access to personalized treatments. Regulatory frameworks must evolve to keep pace with rapid technological advances.

Digital health technologies, including wearable devices and smartphone apps, enable continuous health monitoring and data collection. This real-world evidence can inform treatment decisions and help optimize therapeutic interventions based on individual patient responses.

The future of personalized medicine will likely involve increasingly sophisticated integration of multi-omics data, artificial intelligence, and digital health technologies to provide truly individualized healthcare.`,
    createdAt: "2024-01-22T15:20:00Z"
  },
  {
    id: "doc-9",
    title: "Climate Change Adaptation Strategies for Coastal Cities",
    content: `Coastal cities worldwide face unprecedented challenges from climate change, including sea level rise, increased storm intensity, and changing precipitation patterns. Effective adaptation strategies are essential for protecting millions of residents and trillions of dollars in infrastructure and economic activity.

Sea level rise presents a long-term existential threat to many coastal communities. Current projections suggest global sea levels could rise 1-2 meters by 2100, with potentially higher regional variations. This gradual change is punctuated by more frequent and severe flooding during storm events.

Hard infrastructure solutions include seawalls, levees, and storm surge barriers. The Netherlands' extensive flood protection systems and London's Thames Barrier demonstrate how engineering solutions can protect urban areas. However, these approaches are expensive and can have environmental impacts.

Nature-based solutions offer cost-effective alternatives that provide multiple benefits. Wetland restoration, living shorelines, and green infrastructure can reduce flood risk while providing habitat, improving water quality, and sequestering carbon. Urban forests and green roofs help manage stormwater and reduce urban heat island effects.

Managed retreat involves strategic relocation of people and infrastructure from high-risk areas. While politically challenging, this approach may be necessary for some communities facing severe long-term risks. Early planning and community engagement are essential for successful implementation.

Building code updates and resilient design standards help new construction withstand climate impacts. Elevated foundations, flood-resistant materials, and distributed infrastructure systems reduce vulnerability to flooding and storm damage.

Early warning systems and emergency preparedness are crucial for managing acute climate risks. Improved weather forecasting, evacuation planning, and community education can significantly reduce the impact of extreme weather events.

Regional coordination is essential as climate impacts cross jurisdictional boundaries. Watershed management, shared infrastructure systems, and coordinated planning efforts can improve overall resilience while reducing costs.

Economic tools including insurance reforms, disaster risk financing, and carbon pricing can help align private sector incentives with adaptation goals while providing funding for resilience investments.`,
    createdAt: "2024-01-23T12:00:00Z"
  },
  {
    id: "doc-10",
    title: "The Evolution of E-commerce and Consumer Behavior",
    content: `E-commerce has fundamentally transformed retail and consumer behavior over the past two decades. From simple online catalogs to sophisticated recommendation systems and social commerce, digital shopping continues to evolve at a rapid pace.

Mobile commerce has become dominant, with smartphones now accounting for the majority of online shopping traffic. Mobile apps provide personalized experiences, location-based services, and seamless payment options. Social media integration allows consumers to discover and purchase products without leaving their favorite platforms.

Artificial intelligence powers modern e-commerce through personalized recommendations, chatbots, and dynamic pricing. Machine learning algorithms analyze browsing behavior, purchase history, and demographic data to predict customer preferences and optimize the shopping experience.

Supply chain innovations have enabled faster delivery and improved customer satisfaction. Same-day delivery, subscription services, and fulfillment automation have raised consumer expectations. The pandemic accelerated adoption of buy-online-pickup-in-store (BOPIS) and curbside delivery options.

Consumer behavior has shifted toward more research-driven purchasing decisions. Online reviews, comparison shopping, and social proof significantly influence buying decisions. Consumers expect transparency in pricing, shipping, and return policies.

Sustainability concerns are increasingly important to consumers, driving demand for eco-friendly products and sustainable packaging. Companies are responding with carbon-neutral shipping options, circular economy initiatives, and transparent supply chain reporting.

Augmented reality and virtual reality technologies are enhancing online shopping experiences. Virtual try-on features, 3D product visualization, and immersive shopping environments help bridge the gap between online and in-store shopping.

The future of e-commerce includes voice commerce, Internet of Things integration, and blockchain-based supply chain transparency. Conversational commerce through messaging platforms and voice assistants is becoming more sophisticated.

Privacy regulations like GDPR and CCPA are reshaping how e-commerce companies collect and use customer data. First-party data strategies and privacy-first marketing approaches are becoming essential for sustainable growth.`,
    createdAt: "2024-01-24T17:40:00Z"
  }
];

// Keep the original sampleDocument for backward compatibility
export const sampleDocument: Document = sampleDocuments[0];