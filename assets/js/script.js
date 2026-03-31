 <script>
        // Data awal
        let projects = [
            { id: 1, name: 'Skincare GLOW', client: 'Ayu Lestari', status: 'Active', budget: 25000000 },
            { id: 2, name: 'Fashion Hijab', client: 'Rina Fitri', status: 'Completed', budget: 45000000 },
            { id: 3, name: 'Snack Sehat', client: 'Budi Santoso', status: 'Pending', budget: 18000000 }
        ];
        let nextId = 4;
        
        // Update statistik
        function updateStats() {
            document.getElementById('totalProjects').innerText = projects.length;
            document.getElementById('totalClients').innerText = [...new Set(projects.map(p=>p.client))].length;
            document.getElementById('totalTasks').innerText = projects.filter(p=>p.status==='Pending').length;
            document.getElementById('totalRevenue').innerText = projects.reduce((s,p)=>s+p.budget,0).toLocaleString();
        }
        
        // Render tabel
        function renderTable() {
            const tbody = document.getElementById('projectsTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            projects.forEach(p => {
                let row = tbody.insertRow();
                row.className = 'border-b border-white/10 hover:bg-white/5';
                let statusClass = p.status==='Active' ? 'bg-green-500/20 text-green-400' : (p.status==='Completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400');
                let statusText = p.status==='Active' ? 'Akan Datang' : (p.status==='Completed' ? 'Selesai' : 'Perlu Review');
                row.innerHTML = `
                    <td class="py-3">${p.id}</td>
                    <td class="py-3 font-semibold">${p.name}</td>
                    <td class="py-3">${p.client}</td>
                    <td class="py-3"><span class="px-2 py-1 rounded-full text-xs ${statusClass}">${statusText}</span></td>
                    <td class="py-3">Rp ${p.budget.toLocaleString()}</td>
                    <td class="py-3">
                        <button onclick="editProject(${p.id})" class="text-blue-400 hover:text-blue-300 mr-3"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteProject(${p.id})" class="text-red-400 hover:text-red-300"><i class="fas fa-trash"></i></button>
                    </td>
                `;
            });
            updateStats();
        }
        
        // Modal functions
        function openProjectModal(proj=null) {
            let modal = document.getElementById('projectModal');
            if(proj) {
                document.getElementById('modalTitle').innerText = 'Edit Live Session';
                document.getElementById('projectId').value = proj.id;
                document.getElementById('projectName').value = proj.name;
                document.getElementById('clientName').value = proj.client;
                document.getElementById('projectStatus').value = proj.status;
                document.getElementById('projectBudget').value = proj.budget;
            } else {
                document.getElementById('modalTitle').innerText = 'Tambah Live Session';
                document.getElementById('projectForm').reset();
                document.getElementById('projectId').value = '';
            }
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        
        function closeProjectModal() { 
            let modal = document.getElementById('projectModal'); 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex'); 
        }
        
        // Save project
        function saveProject(e) {
            e.preventDefault();
            let id = document.getElementById('projectId').value;
            let name = document.getElementById('projectName').value;
            let client = document.getElementById('clientName').value;
            let status = document.getElementById('projectStatus').value;
            let budget = parseInt(document.getElementById('projectBudget').value);
            
            if(id) { 
                let idx = projects.findIndex(p=>p.id==id); 
                if(idx!==-1) projects[idx] = {id:parseInt(id),name,client,status,budget}; 
                alert('Data berhasil diupdate!');
            } else { 
                projects.push({id:nextId++,name,client,status,budget}); 
                alert('Data berhasil ditambahkan!');
            }
            renderTable(); 
            closeProjectModal(); 
        }
        
        function editProject(id) { 
            let proj = projects.find(p=>p.id===id); 
            if(proj) openProjectModal(proj); 
        }
        
        function deleteProject(id) { 
            if(confirm('Yakin ingin menghapus live session ini?')) { 
                projects = projects.filter(p=>p.id!==id); 
                renderTable(); 
                alert('Data berhasil dihapus!'); 
            } 
        }
        
        // Navigation
        function showDashboard() { 
            document.getElementById('landingPage').classList.add('hidden'); 
            document.getElementById('dashboardPage').classList.remove('hidden'); 
            renderTable(); 
        }
        
        function showLandingPage() { 
            document.getElementById('landingPage').classList.remove('hidden'); 
            document.getElementById('dashboardPage').classList.add('hidden'); 
        }
        
        function logoutDashboard() { 
            showLandingPage(); 
            alert('Logout berhasil'); 
        }
        
        // Event listeners
        document.getElementById('projectForm')?.addEventListener('submit', saveProject);
        document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
            e.preventDefault(); 
            alert('Pesan terkirim! Tim kami akan menghubungi Anda dalam 1x24 jam.'); 
            e.target.reset();
        });
        
        // Smooth scroll untuk anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Initial render
        renderTable();
    </script>