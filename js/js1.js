  const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => obs.observe(r));

    // Skill card stagger
    document.querySelectorAll('.skill-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.05}s`;
    });