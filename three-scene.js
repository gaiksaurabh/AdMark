// ─────────────────────────────────────────────
// AdMark Studio9 — Three.js 3D Background
// Sticky WebGL canvas with floating geometry
// Palette: ink #0d2a45, blue #3ba6ed, mint #2dd99c, coral #ff6b4a
// ─────────────────────────────────────────────

import * as THREE from 'three';

const canvas = document.getElementById('bg-canvas');
if (!canvas) {
  console.warn('No bg-canvas element found');
} else {
  initScene();
}

function initScene() {
  // ── Renderer ──
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // ── Scene & Camera ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8);

  // ── Lights ──
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const blueLight = new THREE.PointLight(0x3ba6ed, 2.5, 20);
  blueLight.position.set(-4, 2, 3);
  scene.add(blueLight);

  const coralLight = new THREE.PointLight(0xff6b4a, 1.8, 18);
  coralLight.position.set(4, -2, 2);
  scene.add(coralLight);

  // ── Materials ──
  const inkMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d2a45,
    roughness: 0.4,
    metalness: 0.2
  });
  const blueMaterial = new THREE.MeshStandardMaterial({
    color: 0x3ba6ed,
    roughness: 0.3,
    metalness: 0.5,
    emissive: 0x0a2440,
    emissiveIntensity: 0.15
  });
  const coralMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b4a,
    roughness: 0.4,
    metalness: 0.3
  });
  const mintMaterial = new THREE.MeshStandardMaterial({
    color: 0x2dd99c,
    roughness: 0.4,
    metalness: 0.3
  });
  const cardMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.1
  });

  // ── Floating shapes (clusters scattered in space) ──
  const objects = [];

  // Hero zone — large floating sphere (blue)
  const heroSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 64, 64),
    blueMaterial
  );
  heroSphere.position.set(4.2, 0.5, -2);
  heroSphere.userData = { rotSpeed: 0.003, floatAmp: 0.3, floatSpeed: 0.6, basePos: heroSphere.position.clone() };
  scene.add(heroSphere);
  objects.push(heroSphere);

  // Torus (ink, premium accent)
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.18, 32, 100),
    inkMaterial
  );
  torus.position.set(-4, 1.5, -3);
  torus.rotation.set(0.5, 0.8, 0);
  torus.userData = { rotSpeed: 0.005, floatAmp: 0.25, floatSpeed: 0.5, basePos: torus.position.clone(), spin:true };
  scene.add(torus);
  objects.push(torus);

  // Floating business card (rounded box)
  const cardGeo = new THREE.BoxGeometry(1.6, 1, 0.05);
  const card = new THREE.Mesh(cardGeo, cardMaterial);
  card.position.set(3.5, -3.5, -1);
  card.rotation.set(0.1, -0.4, 0.15);
  card.userData = { rotSpeed: 0.002, floatAmp: 0.35, floatSpeed: 0.7, basePos: card.position.clone(), tilt:true };
  scene.add(card);
  objects.push(card);

  // Coral icosahedron
  const coralIcoMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b4a, roughness: 0.4, metalness: 0.3, flatShading: true
  });
  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.6, 0),
    coralIcoMaterial
  );
  ico.position.set(-4.5, -2.5, -1.5);
  ico.userData = { rotSpeed: 0.008, floatAmp: 0.4, floatSpeed: 0.8, basePos: ico.position.clone(), spin:true };
  scene.add(ico);
  objects.push(ico);

  // Mid section — floating cube cluster
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.9, 0.9),
    blueMaterial
  );
  cube.position.set(-3.5, -8, -2);
  cube.rotation.set(0.6, 0.3, 0);
  cube.userData = { rotSpeed: 0.004, floatAmp: 0.3, floatSpeed: 0.55, basePos: cube.position.clone(), spin:true };
  scene.add(cube);
  objects.push(cube);

  // Cylinder (printing cylinder feel)
  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32),
    inkMaterial
  );
  cyl.position.set(4, -9, -2);
  cyl.rotation.set(1.2, 0.3, 0);
  cyl.userData = { rotSpeed: 0.006, floatAmp: 0.25, floatSpeed: 0.65, basePos: cyl.position.clone(), spin:true };
  scene.add(cyl);
  objects.push(cyl);

  // Mint cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    mintMaterial
  );
  cone.position.set(-4, -14, -2);
  cone.rotation.set(-0.3, 0.2, 0.4);
  cone.userData = { rotSpeed: 0.005, floatAmp: 0.3, floatSpeed: 0.6, basePos: cone.position.clone(), spin:true };
  scene.add(cone);
  objects.push(cone);

  // Large sphere far back
  const bgSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 64, 64),
    coralMaterial
  );
  bgSphere.position.set(4.5, -15, -4);
  bgSphere.userData = { rotSpeed: 0.002, floatAmp: 0.4, floatSpeed: 0.4, basePos: bgSphere.position.clone() };
  scene.add(bgSphere);
  objects.push(bgSphere);

  // Distant torus knot
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16),
    blueMaterial
  );
  knot.position.set(-3.5, -20, -2);
  knot.userData = { rotSpeed: 0.007, floatAmp: 0.25, floatSpeed: 0.7, basePos: knot.position.clone(), spin:true };
  scene.add(knot);
  objects.push(knot);

  // Bottom — pyramid/tetrahedron
  const tetra = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.7),
    new THREE.MeshStandardMaterial({ color: 0xffc24a, roughness: 0.4, metalness: 0.3, flatShading: true })
  );
  tetra.position.set(4, -22, -2);
  tetra.userData = { rotSpeed: 0.006, floatAmp: 0.3, floatSpeed: 0.6, basePos: tetra.position.clone(), spin:true };
  scene.add(tetra);
  objects.push(tetra);

  // ── Particle field ──
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40 - 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x3ba6ed,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse parallax ──
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Scroll tracking ──
  let scrollY = 0;
  let targetScrollY = 0;
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  // ── Resize ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Animation loop ──
  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();

    // smooth mouse
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    // smooth scroll
    scrollY += (targetScrollY - scrollY) * 0.08;
    const scrollOffset = scrollY * 0.005; // controls vertical drift

    // Camera follows scroll downward + parallax with mouse
    camera.position.y = -scrollOffset;
    camera.position.x = mouse.x * 0.5;
    camera.rotation.y = -mouse.x * 0.05;
    camera.rotation.x = mouse.y * 0.03;

    // Object animations
    for (const obj of objects) {
      const ud = obj.userData;
      // float
      obj.position.y = ud.basePos.y + Math.sin(t * ud.floatSpeed) * ud.floatAmp;
      // spin
      if (ud.spin) {
        obj.rotation.x += ud.rotSpeed;
        obj.rotation.y += ud.rotSpeed * 0.7;
      } else {
        obj.rotation.y += ud.rotSpeed;
      }
      // card tilts to mouse
      if (ud.tilt) {
        obj.rotation.x = 0.1 + mouse.y * 0.2;
        obj.rotation.z = 0.15 - mouse.x * 0.15;
      }
    }

    // Particles drift
    particles.rotation.y = t * 0.02;
    particles.position.y = scrollOffset * 0.3;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Disable on low-performance / motion-sensitive
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    canvas.style.opacity = '0.3';
  }
}
