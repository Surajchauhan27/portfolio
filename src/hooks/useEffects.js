import { useEffect } from 'react';

/* ── Scroll reveal ─────────────────────────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            setTimeout(() => entry.target.classList.add('in'), delay);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    // observe all .sr elements (including those added later)
    const run = () => {
      document.querySelectorAll('.sr:not(.in)').forEach(el => io.observe(el));
    };
    run();

    // re-run after any dynamic renders (small delay)
    const t = setTimeout(run, 400);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
}

/* ── 3-D tilt ──────────────────────────────────────────────── */
export function useTilt() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

    const cards = document.querySelectorAll('.tilt');

    const handlers = [];
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y - r.height / 2) / r.height) * -10;
        const ry = ((x - r.width  / 2) / r.width ) *  10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
      };
      const onLeave = () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  });           // re-run every render so new cards get registered
}

/* ── Custom cursor ─────────────────────────────────────────── */
export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(tick);
    };

    const addHover  = () => document.body.classList.add('cursor-hover');
    const remHover  = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,.tilt').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', remHover);
    });

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
