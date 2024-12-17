import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';

// Import components
import LeftPane from './LeftPane.js';
import MiddlePane from './MiddlePane.js';
import RightPane from './RightPane.js';
import ResizeHandle from './ResizeHandle.js';
import FilterBar from './FilterBar.js';

// Import mock data
import { riskContributors } from '../../data/mockRiskContributors.js';
import {
  ruleToFingerprints,
  fingerprintData,
} from '../../data/mockFingerprints.js';
import { fingerprintToUris } from '../../data/mockUris.js';

const SecurityDashboard = () => {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(31.33);
  const [middleWidth, setMiddleWidth] = useState(31.33);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingMiddle, setIsResizingMiddle] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startLeftWidth, setStartLeftWidth] = useState(0);
  const [startMiddleWidth, setStartMiddleWidth] = useState(0);
  const [sortConfig, setSortConfig] = useState([
    { field: 'weight', order: 'desc' },
    { field: 'affectedEndpoints', order: 'desc' },
  ]);
  const [selectedRisks, setSelectedRisks] = useState(new Set());
  const [fingerprintSort, setFingerprintSort] = useState({
    field: 'confidence',
    order: 'desc',
  });
  const [uriSort, setUriSort] = useState({
    field: 'count',
    order: 'desc',
  });
  const [selectedFingerprints, setSelectedFingerprints] = useState(new Set());

  const handleSelectAll = event => {
    if (event.target.checked) {
      setSelectedRisks(new Set(sortedContributors.map(item => item.id)));
    } else {
      setSelectedRisks(new Set());
    }
  };

  const handleSelectRisk = id => {
    setSelectedRisks(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSort = property => {
    setSortConfig(prevConfig => {
      const newConfig = [...prevConfig];
      const index = newConfig.findIndex(config => config.field === property);

      if (index !== -1) {
        newConfig[index] = {
          ...newConfig[index],
          order: newConfig[index].order === 'asc' ? 'desc' : 'asc',
        };
        newConfig.unshift(...newConfig.splice(index, 1));
      } else {
        newConfig.unshift({ field: property, order: 'desc' });
      }

      return newConfig;
    });
  };

  const handleFingerprintSort = field => {
    setFingerprintSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleUriSort = field => {
    setUriSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleFingerprintSelect = fingerprintId => {
    setSelectedFingerprints(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(fingerprintId)) {
        newSelected.delete(fingerprintId);
      } else {
        newSelected.add(fingerprintId);
      }
      return newSelected;
    });
  };

  const sortedContributors = React.useMemo(() => {
    return [...riskContributors].sort((a, b) => {
      for (const { field, order } of sortConfig) {
        const isAsc = order === 'asc';
        const valueA = field === 'weight' ? a.weight : a.affectedEndpoints;
        const valueB = field === 'weight' ? b.weight : b.affectedEndpoints;

        if (valueA !== valueB) {
          return isAsc ? valueA - valueB : valueB - valueA;
        }
      }
      return 0;
    });
  }, [sortConfig]);

  const getRelatedFingerprints = React.useMemo(() => {
    if (selectedRisks.size === 0) return [];

    const fingerprintIds = new Set();
    selectedRisks.forEach(riskId => {
      const relatedIds = ruleToFingerprints[riskId] || [];
      relatedIds.forEach(id => fingerprintIds.add(id));
    });

    let fingerprints = Array.from(fingerprintIds)
      .map(id => fingerprintData[id])
      .filter(Boolean);

    const { field, order } = fingerprintSort;
    const isAsc = order === 'asc';
    fingerprints.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      return isAsc ? valueA - valueB : valueB - valueA;
    });

    return fingerprints;
  }, [selectedRisks, fingerprintSort]);

  useEffect(() => {
    if (getRelatedFingerprints.length > 0) {
      setSelectedFingerprints(new Set(getRelatedFingerprints.map(f => f.id)));
    } else {
      setSelectedFingerprints(new Set());
    }
  }, [getRelatedFingerprints]);

  const getSortDirection = field => {
    const config = sortConfig.find(c => c.field === field);
    return config ? config.order : 'asc';
  };

  const getSortPriority = field => {
    const index = sortConfig.findIndex(c => c.field === field);
    return index === -1 ? null : index + 1;
  };

  const handleResizeStartLeft = e => {
    setIsResizingLeft(true);
    setStartX(e.clientX);
    setStartLeftWidth(leftWidth);
  };

  const handleResizeStartMiddle = e => {
    setIsResizingMiddle(true);
    setStartX(e.clientX);
    setStartMiddleWidth(middleWidth);
  };

  const handleResizeMove = e => {
    if (!isResizingLeft && !isResizingMiddle) return;

    const containerWidth = containerRef.current.offsetWidth;
    const deltaX = ((e.clientX - startX) / containerWidth) * 100;

    if (isResizingLeft) {
      const newLeftWidth = Math.min(Math.max(startLeftWidth + deltaX, 23), 35);
      setLeftWidth(newLeftWidth);

      const remainingWidth = 94 - newLeftWidth;
      const newMiddleWidth = Math.min(
        Math.max(middleWidth, 23),
        remainingWidth - 31.33,
      );
      setMiddleWidth(newMiddleWidth);
    }

    if (isResizingMiddle) {
      const maxMiddleWidth = 94 - leftWidth - 31.33;
      const newMiddleWidth = Math.min(
        Math.max(startMiddleWidth + deltaX, 23),
        maxMiddleWidth,
      );
      setMiddleWidth(newMiddleWidth);
    }
  };

  const handleResizeEnd = () => {
    setIsResizingLeft(false);
    setIsResizingMiddle(false);
  };

  const sortedUris = React.useMemo(() => {
    const allUris = [];
    selectedFingerprints.forEach(fingerprintId => {
      const uris = fingerprintToUris[fingerprintId] || [];
      allUris.push(...uris);
    });

    const uriMap = new Map();
    allUris.forEach(uri => {
      const key = `${uri.uri}-${uri.method}-${uri.status}`;
      if (uriMap.has(key)) {
        uriMap.get(key).count += uri.count;
      } else {
        uriMap.set(key, { ...uri });
      }
    });

    const uniqueUris = Array.from(uriMap.values());
    return uniqueUris.sort((a, b) => {
      const isAsc = uriSort.order === 'asc';
      const valueA = a[uriSort.field];
      const valueB = b[uriSort.field];

      if (typeof valueA === 'string') {
        return isAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return isAsc ? valueA - valueB : valueB - valueA;
    });
  }, [uriSort, selectedFingerprints]);

  useEffect(() => {
    if (isResizingLeft || isResizingMiddle) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizingLeft, isResizingMiddle]);

  // Get selected rules data
  const selectedRulesData = React.useMemo(() => {
    return sortedContributors
      .filter(rule => selectedRisks.has(rule.id))
      .map(rule => ({
        id: rule.id,
        name: rule.name,
      }));
  }, [sortedContributors, selectedRisks]);

  // Get selected fingerprints data
  const selectedFingerprintsData = React.useMemo(() => {
    return Array.from(selectedFingerprints).map(id => ({
      id,
      ...fingerprintData[id],
    }));
  }, [selectedFingerprints]);

  const handleRemoveRule = ruleId => {
    setSelectedRisks(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(ruleId);
      return newSelected;
    });
  };

  const handleRemoveFingerprint = fingerprintId => {
    setSelectedFingerprints(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(fingerprintId);
      return newSelected;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedRisks(new Set());
    setSelectedFingerprints(new Set());
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <FilterBar
        selectedRules={selectedRulesData}
        selectedFingerprints={selectedFingerprintsData}
        onRemoveRule={handleRemoveRule}
        onRemoveFingerprint={handleRemoveFingerprint}
        onClearAll={handleClearAllFilters}
      />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          gap: 2,
          userSelect: isResizingLeft || isResizingMiddle ? 'none' : 'auto',
          position: 'relative',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: `${leftWidth}%`,
            flexShrink: 0,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <LeftPane
            width={100}
            sortedContributors={sortedContributors}
            selectedRisks={selectedRisks}
            handleSelectAll={handleSelectAll}
            handleSelectRisk={handleSelectRisk}
            handleSort={handleSort}
            getSortDirection={getSortDirection}
            getSortPriority={getSortPriority}
          />
        </Box>

        <ResizeHandle
          left={leftWidth}
          isResizing={isResizingLeft}
          onMouseDown={handleResizeStartLeft}
        />

        <Box
          sx={{
            width: `${middleWidth}%`,
            flexShrink: 0,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <MiddlePane
            width={100}
            getRelatedFingerprints={getRelatedFingerprints}
            selectedFingerprints={selectedFingerprints}
            setSelectedFingerprints={setSelectedFingerprints}
            handleFingerprintSelect={handleFingerprintSelect}
            fingerprintSort={fingerprintSort}
            handleFingerprintSort={handleFingerprintSort}
          />
        </Box>

        <ResizeHandle
          left={leftWidth + middleWidth}
          isResizing={isResizingMiddle}
          onMouseDown={handleResizeStartMiddle}
        />

        <Box
          sx={{
            width: `${94 - leftWidth - middleWidth}%`,
            flexShrink: 0,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <RightPane
            width={100}
            sortedUris={sortedUris}
            selectedFingerprints={selectedFingerprints}
            uriSort={uriSort}
            handleUriSort={handleUriSort}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SecurityDashboard;
