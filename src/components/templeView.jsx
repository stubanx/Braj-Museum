import { useRef, useEffect } from 'react';
const Temple = ({ isOpen, setIsOpen, temple }) => {
    const dialogRef = useRef(null);
    const panoramaElement = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
            if (!viewerRef.current) {
                // Initialize the Pannellum viewer only once
                viewerRef.current = pannellum.viewer(panoramaElement.current, {
                    "default": {
                        "firstScene": "circle",
                        "autoLoad": true,
                        "sceneFadeDuration": 1000,
                        // "showControls": false,
                        "autoRotate": -5
                    },
                    "scenes": {
                        "circle": {
                            "title": temple,
                            "hfov": 50,
                            "pitch": 10,
                            "yaw": 0,
                            "type": "equirectangular",
                            "panorama": `/views/${temple}.jpeg`
                        }
                    }
                });
            }
        } else {
            // Close the dialog if not open
            dialogRef.current?.close();
        }

        // Clean up when the component is unmounted or dialog is closed
        return () => {
            if (viewerRef.current && !isOpen) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [isOpen]);

    const handleClose = () => {
        dialogRef.current.close();
        setIsOpen(false);
    };

    const dialogStyle = {
        position: 'absolute',
        top: '0',
        disaply: 'block',
        width: '100vw',
        height: '100vh',
        border: 'none',
        overflow: 'hidden',
        margin: 'auto'
    }

    return (
        <dialog className="dialog" ref={dialogRef} style={dialogStyle}>
            <button style={{ position: 'absolute', zIndex: 1000, width: "50px", border: "none", height: "40px", right: "0", backgroundColor: "red", color: "white", fontWeight: "800", cursor: "pointer"}} onClick={handleClose}>Exit</button>
            {isOpen && <div ref={panoramaElement} style={{ width: '100%', height: '100%' }} />}
        </dialog>
    );
};

export default Temple;
