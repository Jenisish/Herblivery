let scannerStarted = false;
let html5Qrcode;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Smooth scrolling for CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector('#scan');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scan another button functionality
  const scanAnotherBtn = document.getElementById('scan-another');
  if (scanAnotherBtn) {
    scanAnotherBtn.addEventListener('click', function() {
      document.getElementById('results').classList.add('hidden');
      document.querySelector('#scan').scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Scanner functionality
document.getElementById("start-scan").addEventListener("click", function () {
  const scanButton = document.getElementById("start-scan");
  const scannerStatus = document.getElementById("scanner-status");
  
  if (!scannerStarted) {
    // Update UI
    scanButton.innerHTML = '<i class="fas fa-stop"></i><span>Stop Camera</span>';
    scannerStatus.innerHTML = '<i class="fas fa-circle" style="color: #dc3545;"></i><span>Scanning...</span>';
    
    html5Qrcode = new Html5Qrcode("reader");
    html5Qrcode.start(
      { facingMode: "environment" }, // rear camera
      { fps: 10, qrbox: { width: 250, height: 250 } },
      onScanSuccess
    ).then(() => {
      scannerStarted = true;
    }).catch(err => {
      console.error("Camera start failed: ", err);
      showError("Unable to access camera. Please allow camera permission or try refreshing the page.");
      resetScannerUI();
    });
  } else {
    // Stop scanner
    stopScanner();
  }
});

function stopScanner() {
  if (html5Qrcode && scannerStarted) {
    html5Qrcode.stop().then(() => {
      console.log("Camera stopped");
      resetScannerUI();
    }).catch(err => {
      console.error("Failed to stop camera:", err);
      resetScannerUI();
    });
  }
}

function resetScannerUI() {
  scannerStarted = false;
  const scanButton = document.getElementById("start-scan");
  const scannerStatus = document.getElementById("scanner-status");
  
  scanButton.innerHTML = '<i class="fas fa-camera"></i><span>Start Camera</span>';
  scannerStatus.innerHTML = '<i class="fas fa-circle" style="color: #28a745;"></i><span>Ready to scan</span>';
}

function showError(message) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="detail-card">
      <h3 style="color: #dc3545;"><i class="fas fa-exclamation-triangle"></i> Error</h3>
      <p class="error">${message}</p>
    </div>
  `;
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

function onScanSuccess(decodedText, decodedResult) {
  console.log("QR Code scanned:", decodedText);
  
  // Stop scanner immediately after scan
  stopScanner();
  
  // Show loading
  showLoading();

  fetch(`/get_package/${decodedText}`)
    .then(response => response.json())
    .then(data => {
      hideLoading();
      displayResults(data);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      hideLoading();
      showError("Failed to fetch package details. Please check your internet connection and try again.");
    });
}

function displayResults(data) {
  const resultDiv = document.getElementById("result");

  if (data.error) {
    showError(data.error);
    return;
  }

  // Package details
  let packageHtml = `
    <div class="detail-card">
      <h3><i class="fas fa-box"></i> Package Details</h3>
      <div class="detail-grid">
        <p><strong>Package ID:</strong> ${data.package_details.package_id}</p>
        <p><strong>Product Name:</strong> ${data.package_details.product_name}</p>
        <p><strong>Brand:</strong> ${data.package_details.brand}</p>
        <p><strong>Packaging Type:</strong> ${data.package_details.packaging_type.english} (${data.package_details.packaging_type.sanskrit})</p>
        <p><strong>Packaged On:</strong> ${formatDate(data.package_details.packaging_date)}</p>
        <p><strong>Expiry Date:</strong> ${formatDate(data.package_details.expiry_date)}</p>
        <p><strong>Unit:</strong> ${data.package_details.packaging_unit}</p>
        <p><strong>Quantity:</strong> ${data.package_details.quantity_units}</p>
        <p><strong>Quality Check:</strong> <span class="status-badge ${getStatusClass(data.package_details.quality_check)}">${data.package_details.quality_check}</span></p>
      </div>
    </div>
  `;

  // Retailer details
  let retailerHtml = "";
  if (data.retailer_details) {
    retailerHtml = `
      <div class="detail-card">
        <h3><i class="fas fa-store"></i> Retailer Information</h3>
        <div class="detail-grid">
          <p><strong>Retailer Name:</strong> ${data.retailer_details.retailer.name}</p>
          <p><strong>License Number:</strong> ${data.retailer_details.retailer.license}</p>
          <p><strong>Location:</strong> ${data.retailer_details.retailer.location}</p>
          <p><strong>Date Received:</strong> ${formatDate(data.retailer_details.date_received)}</p>
        </div>
      </div>
    `;
  }

  // Ingredients with enhanced timeline
  let ingredientsHtml = `
    <div class="detail-card">
      <h3><i class="fas fa-leaf"></i> Ingredient Journey</h3>
      <div class="timeline">
  `;
  
  data.ingredients.forEach((ing, index) => {
    ingredientsHtml += `
      <div class="timeline-step">
        <h4><i class="fas fa-seedling"></i> ${ing.herb_details.herb_name || "Unknown Herb"}</h4>
        <div class="herb-info">
          <p><strong>Scientific Name:</strong> ${ing.herb_details.scientific_name || "Not specified"}</p>
          <p><strong>Form:</strong> ${ing.form.english || "-"} / ${ing.form.sanskrit || "-"}</p>
          <p><strong>Batch ID:</strong> ${ing.batch_id}</p>
        </div>
        
        <div class="journey-section">
          <h5><i class="fas fa-tractor"></i> Farm Origin</h5>
          <div class="farm-details">
            <p><strong>Farmer:</strong> ${ing.farm_details.farmer?.name || "Not specified"}</p>
            ${ing.farm_details.farmer?.certifications?.length ? 
              `<p><strong>Certifications:</strong> ${ing.farm_details.farmer.certifications.map(cert => `<span class="certification-badge">${cert}</span>`).join(' ')}</p>` : ''}
            <p><strong>Farm Location:</strong> ${ing.farm_details.farm_location?.village || "Not specified"}, ${ing.farm_details.farm_location?.state || "Not specified"}</p>
            <p><strong>Sowing Date:</strong> ${formatDate(ing.farm_details.sowing_date)}</p>
            <p><strong>Harvest Date:</strong> ${formatDate(ing.farm_details.harvest_date)}</p>
            <p><strong>Yield:</strong> ${ing.farm_details.yield_quantity_kg || "Not specified"} kg</p>
            <p><strong>Quality Check:</strong> <span class="status-badge ${getStatusClass(ing.farm_details.quality_check)}">${ing.farm_details.quality_check || "Not specified"}</span></p>
          </div>
        </div>
        
        <div class="journey-section">
          <h5><i class="fas fa-cogs"></i> Processing Steps</h5>
          <div class="processing-steps">
            ${ing.processing_details.map(p => `
              <div class="processing-step">
                <div class="step-header">
                  <strong>${p.process_type}</strong>
                  <span class="step-date">${formatDate(p.timestamp)}</span>
                </div>
                <p><strong>Output Form:</strong> ${p.output_form.english} (${p.output_form.sanskrit})</p>
                <p><strong>Processing Unit:</strong> ${p.unit.name}, ${p.unit.location}</p>
                <p><strong>Equipment Used:</strong> ${p.equipment}</p>
                <p><strong>Operator:</strong> ${p.operator}</p>
                <p><strong>Quality Check:</strong> <span class="status-badge ${getStatusClass(p.quality_check)}">${p.quality_check}</span></p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  });
  
  ingredientsHtml += `</div></div>`;

  resultDiv.innerHTML = packageHtml + retailerHtml + ingredientsHtml;
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

// Utility functions
function formatDate(dateString) {
  if (!dateString || dateString === "-") return "Not specified";
  try {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

function getStatusClass(status) {
  if (!status) return "status-unknown";
  const statusLower = status.toLowerCase();
  if (statusLower.includes("pass") || statusLower.includes("approved") || statusLower.includes("good")) {
    return "status-success";
  } else if (statusLower.includes("fail") || statusLower.includes("rejected") || statusLower.includes("poor")) {
    return "status-danger";
  } else {
    return "status-warning";
  }
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
});
