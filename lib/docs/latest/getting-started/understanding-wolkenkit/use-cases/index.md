# Use cases

If you consider using wolkenkit, there are scenarios that fit better and of course also a few that fit less well. In the following, a variety of scenarios is presented as examples, and evaluated how well they are suitable as use cases for wolkenkit. Naturally, there is no clear dividing line here. The mentioned examples serve rather as indicators, and require an individual interpretation from case to case.

If you have questions on whether your use case should be implemented with wolkenkit, feel free to [contact the native web](mailto:hello@thenativeweb.io) to discuss your ideas.

## Bad use cases

The following examples show use cases that are for various reasons less suitable for the use of wolkenkit. Please note that the individual reasons are more important than the specific examples.

### Data-driven applications

Data-driven applications are based on CRUD, i.e. they only use the four verbs *create*, *read*, *update* and *delete* for modeling and accessing data. This is adequate for simple use cases that actually only store and retrieve data without additional logic, such as forms over data or storing data from sensors.

In contrast, wolkenkit is based on the assumption that applications represent complex domains with extensive business logic, and hence uses [event-sourcing](../why-wolkenkit/#learning-from-your-past) rather than CRUD. To benefit from the advantages of event-sourcing, you first have to model your domain using domain-driven design. This may be too much effort for very simple domains.

### Hard real-time

Hard real-time applications require reliable and extremely accurate time management. Typical applications include audio sequencing and some robotics scenarios. Since wolkenkit is based on JavaScript and Node.js and these technologies do not offer real-time capabilities, wolkenkit is not real-time capable either.

### Hard consistency

Applications that require hard consistency typically prefer consistency to availability. In other words, for these applications it is better to go down than to display stale data. This is required, for example, by systems that are life-critical or otherwise affect the health or safety of humans and animals.

wolkenkit is based on eventual consistency, which means that data may only be updated after a short period of time. This gives up the hard consistency for better availability, and is fine for many applications such as typical business applications. Additionally, this approach is well-known and successfully used by various large-scale social media platforms, e.g. Facebook and Twitter.

### Single-process and embedded applications

Single-process and embedded applications typically run on very limited and constrained hardware. This is required, for example, by applications that act as machine controllers and are executed on a SoC or other limited environments such as Arduino and Raspberry Pi.

Since wolkenkit is designed as a distributed system and based on Docker, it is (at least right now) not suitable for these environments.

::: hint-tip
> **Lightweight runtime environment**
>
> While not currently available, a lightweight wolkenkit runtime environment could be done. If you are interested in this, please [contact the native web](mailto:hello@thenativeweb.io).
:::

### UI prototypes and frontend development

UI prototypes, as the name implies, focus on the design and development of a frontend. They are usually developed by agencies or design teams, and used for example to demonstrate concepts. However, often not all concepts, processes and requirements are known from the beginning, instead they are developed on the basis of the prototype together with the customer.

Unfortunately, at least at this point in time, this makes it difficult to model the underlying domain in detail using domain-driven design, which in turn makes it hard to develop the backend with wolkenkit. Once the concepts are well defined, e.g. using design thinking and story telling, and the domain is modeled this will change, since wolkenkit can then be used to develop a solid and sustainable backend that reflects the domain and perfectly matches the frontend.

## Good use cases

The following examples show use cases that are well suited for the use of wolkenkit. Please note that the individual reasons are more important than the specific examples.

### Complex domains

Complex domains require a detailed and in-depth analysis of the underlying processes, for which the use of domain-driven design in an [interdisciplinary team](../why-wolkenkit/#empowering-interdisciplinary-teams) is ideal. Once a domain has been modeled, it is essential to transform the model into code as seamlessly as possible.

This is exactly where wolkenkit has its strengths: It allows developers to focus on the domain and hides the technical details, making the code easier to read and to reason about. This way you can efficiently build and maintain an API for your business, that also enables integration with other services.

### Historical data

In many applications, you need access to historical data at some point in time, for example to create reports or analyze data. Since wolkenkit is based on [event-sourcing](../why-wolkenkit/#learning-from-your-past) and therefore stores all events that have happened in your domain, it provides historical data without further ado.

The better the underlying domain was modelled, the more meaningful are the correlations that can be recognized in the events. This empowers you to learn from the past and get new insights into your domain – even back in time! This way you will get answers to questions of which you do not know today that you will ask them tomorrow.

### Soft real-time

Soft real-time is becoming increasingly important for applications as digital collaboration becomes more and more popular. However, push notifications and live updates of already delivered data are difficult to implement from a technical point of view, if you want to get the details right.

Fortunately, wolkenkit comes with support for soft real-time by default. This makes wolkenkit an ideal platform for collaborative web applications in which different users manage a shared state, similar to what you may know from Trello or other collaboration tools.

### High availability

High availability and scalability are important factors for successful web and cloud applications. By building on eventual consistency and preferring availability to hard consistency, wolkenkit enables your applications to [scale with confidence](../why-wolkenkit/#scaling-with-confidence). You can even scale the write and the read model of your application independent of each other, without having to care about the technical details in your code.

### Domain preto- and prototyping

From time to time there are specific ideas for domains that could be worth implementing. In the past, this was a time-consuming process, because in addition to the actual domain, the technical foundation always had to be developed, too.

With wolkenkit this additional effort is no longer necessary as it enables you to focus exclusively on the domain. This way, you can rapidly try out and evaluate ideas, and build an API for them, which you can then use, for example, to wire them up with a UI prototype.

### Take-away backend for frontend developers

With wolkenkit you no longer have to be concerned with the technical foundation of an application, but instead can focus on the domain-oriented code. This makes it easier for frontend and UI teams to develop backends and APIs. In other words, wolkenkit is the take-away backend for frontend developers.
