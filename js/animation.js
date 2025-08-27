gsap.registerPlugin(ScrollTrigger)

const animationTexts = gsap.utils.toArray(".animation-text")

animationTexts.forEach((section, index) => {
    const text = section.querySelectorAll(".animation-word")
    let animation = gsap.from(text, { y: 100, opacity: 0, stagger: 0.2 })

    ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
        animation: animation,
        markers: false
    })
})

const animationBlocks = gsap.utils.toArray(".animation-blocks")

animationBlocks.forEach((section, index) => {
    const text = section.querySelectorAll(".animation-block")
    let animation = gsap.from(text, { y: 100, opacity: 0, stagger: 0.4 })

    ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
        animation: animation,
        markers: false
    })
})